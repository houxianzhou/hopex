import { message as Message } from 'antd'
import { joinModel, getRes, resOk, formatNumber, _, formatJson, asyncPayload, deepClone } from '@utils'
import wss from '@services/SocketClient'
import modelExtend from '@models/modelExtend'
import {
  getLatestRecord, getEnsureRecord, postLimitOrder, postMarketOrder,
  getKline, getPurseAssetList, getPersonalEnsure, doCancelPersonEnsure,
  getPosition, getPersonEnsureDetail, getAllMarkets
} from "@services/trade"


export default joinModel(modelExtend, {
  namespace: 'home',
  state: {
    marketList: [], // 合约列表
    marketName: '', //当前合约名称
    marketCode: '', //当前合约code
    numberToFixed: 2, // 小数点位数

    latest_records: [],// 最新成交
    ensure_records: {},// 委托列表

    maxPrice: null, // 24h最高
    minPrice: null, // 24最低
    indexPrice: null, // 现货价格指数

    latestPrice: null, //直接从最新成交列表拿的，最新交易价格
    latestPriceTrend: 1,//1||0合理趋势，比上次大为1小就是0

    equitablePrice: null, // 计算出来的，合理价格


    minVaryPrice: null, //最小变动价位
    minDealAmount: null, //最小交易量
    keepBailRate: null,//维持保证金率
    levelages: [],//杠杆


    personalEnsures: [],//个人委托列表
    personalEnsures_PageIndex: null,

    positionList: [],//个人持仓列表
  },
  subscriptions: {
    setup({ dispatch, history }) {
      dispatch({
        type: 'startInit'
      })
    },
  },

  effects: {
    * startInit({ payload = {}, own }, { call, put }) {
    },

    // 最新成交列表
    * getLatestRecord({ payload = {} }, { call, put }) {
      const repayload = yield (asyncPayload(yield put({
        type: 'createRequestParams',
        payload: {
          "head": {
            "method": "market.deals",
          },
          "param": {
            "pageSize": "100",
            "lastId": "1"
          }
        }
      })))
      const res = getRes(yield call(getLatestRecord, repayload))
      if (resOk(res)) {
        yield put({
          type: 'changeState',
          payload: {
            latest_records: res.data.records,
            latestPrice: _.get(res.data.records[0], 'price')
          }
        })
        return res
      }
    },
    // 委托列表
    * getEnsureRecord({ payload = {} }, { call, put }) {
      const repayload = yield (asyncPayload(yield put({
        type: 'createRequestParams',
        payload: {
          "head": {
            "method": "market.active_delegate",
          },
          "param": {
            "pageSize": "100", //不能大于101
            "interval": "0" //固定值
          }
        }
      })))
      const res = getRes(yield call(getEnsureRecord, repayload))

      if (resOk(res)) {
        const result = {
          asks: _.orderBy(formatNumber(_.get(res.data, 'asks'), ['price', 'amount']), ['price'], ['desc']),
          bids: _.orderBy(formatNumber(_.get(res.data, 'bids'), ['price', 'amount']), ['price'], ['desc'])
        }
        const [asksLast, bidsFirst] = [result.asks[result.asks.length > 8 ? 7 : result.asks.length - 1], result.bids[0]]
        yield put({
          type: 'changeState',
          payload: {
            ensure_records: result,
            equitablePrice: formatNumber((_.get(asksLast, 'price') * _.get(bidsFirst, 'amount')
              + _.get(bidsFirst, 'price') * _.get(asksLast, 'amount')) / (_.get(asksLast, 'amount') + _.get(bidsFirst, 'amount')), 'p')
          }
        })
        return res
      }
    },

    //K线图全量查询
    * getKlineAllList({ payload = {} }, { call, put }) {
      const ws1 = wss.getSocket('ws1')
      const { startTime, endTime } = payload
      const repayload = yield (asyncPayload(yield put({
        type: 'createRequestParams',
        payload: {
          head: {
            "method": "kline.query",
          },
          param: {
            "startTime": startTime,
            "endTime": endTime,
            "interval": "86400"
          }
        }
      })))
      return ws1.sendJsonPromise(repayload, (e) => {
        const res = getRes(e)
        if (resOk(res)) {
          const result = formatJson(res.data)
          if (_.get(result, 'head.method') === 'kline.query') {
            return _.get(result, 'data.records')
          }
        }
      })
    },

    //K线图增量订阅
    * getKlineAddMore({ payload = {} }, { call, put }) {
      const ws1 = wss.getSocket('ws1')
      const repayload = yield (asyncPayload(yield put({
        type: 'createRequestParams',
        payload: {
          head: {
            "method": "kline.subscribe"
          },
          param: {
            "interval": "86400"
          }
        }
      })))
      ws1.sendJson(repayload)
    },

    //现货价格指数，24最高，24h最低
    * getImportantPrice({ payload = {} }, { call, put }) {
      const { method } = payload
      const ws2 = wss.getSocket('ws2')
      if (method === 'sub') {
        // 订阅三个价格
        const repayload = yield (asyncPayload(yield put({
          type: 'createRequestParams',
          payload: {
            "event": "subscribe",
            "channel": "market",
            "pair": "BTCUSD",
            "type": 1
          }
        })))
        return ws2.sendJsonPromise(repayload, (e) => {
          const res = getRes(e)
          if (resOk(res)) {
            const result = formatJson(res.data)
            return result.chanId
          }
        }).then(res => res)
      } else if (method === 'unsub') {
        // 取消订阅三个价格
        const { chanId } = payload
        const repayload = {
          "event": "unsubscribe",
          chanId
        }
        return ws2.sendJsonPromise(repayload, (e) => {
          const res = getRes(e)
          if (resOk(res)) {
            const result = formatJson(res.data)
            if (_.get(result, 'event') === 'unsubscribed'
              && _.get(result, 'status') === 'OK'
              && _.get(result, 'chanId') === chanId) {
              return true
            }
          }
        }).then(res => res)
      }
    },

    //钱包列表 asset.list
    * getPurseAssetList({ payload = {} }, { call, put }) {
      const repayload = yield (asyncPayload(yield put({
        type: 'createRequestParams',
        payload: {
          "head": {
            "method": "asset.list"
          },
          "param": {},
          powerMsg: '钱包列表 asset.list',
          power: [1]
        }
      })))
      if (repayload) {
        const res = getRes(yield call(getPurseAssetList, repayload))
        if (resOk(res)) {
          const result = _.get(res, 'data.assetList')
          if (result) {
            yield put({
              type: 'changeState',
              payload: {
                assetList: result
              }
            })
          }
        }
      }
    },

    //合约列表 market.list
    * getAllMarkets({ payload = {} }, { call, put }) {
      const repayload = yield (asyncPayload(yield put({
        type: 'createRequestParams',
        payload: {
          "head": {
            "method": "market.list"
          },
          "param": {},
        }
      })))
      const res = getRes(yield call(getAllMarkets, repayload))
      if (resOk(res)) {
        const result = []
        _.mapKeys((_.get(res, 'data') || {}), (v = [], k = '') => {
          v.forEach(item => item.sortType = k)
          result.push(...v)
        })
        result.map(item => {
          item.levelages = formatJson(item.levelages)
        })
        if (result) {
          const { search } = payload
          const filterOne = result.filter(item => item.marketCode === search)[0] || result[0]
          yield put({
            type: 'changeState',
            payload: {
              marketList: result
            }
          })
          yield put({
            type: 'getCurrentMarket',
            payload: filterOne
          })
          return result
        }
      } else {
        return Promise.reject('合约列表获取失败')
      }
    },

    //个人持仓列表
    * getPosition({ payload = {} }, { call, put }) {
      const repayload = yield (asyncPayload(yield put({
        type: 'createRequestParams',
        payload: {
          "head": {
            "method": "user.position"
          },
          "param": {
            "marketList": [],
            "pageIndex": "0",//页码
            "pageSize": "100"//每页数量
          },
          power: [1],
          powerMsg: '个人持仓列表'
        }
      })))
      if (repayload) {
        const res = getRes(yield call(getPosition, repayload))
        if (resOk(res)) {
          const result = _.get(res, 'data.positionList')
          if (result) {
            yield put({
              type: 'changeState',
              payload: {
                positionList: result
              }
            })
            return result
          }
        }
      }
    },

    //个人合约列表 查询用户的所有活跃委托
    * getPersonalEnsure({ payload = {} }, { call, put, select }) {
      const { pageIndex = 1, pageSize = 10, callback } = payload
      const repayload = yield (asyncPayload(yield put({
        type: 'createRequestParams',
        payload: {
          "head": {
            "method": "order.user_active_delegate"
          },
          "param": {
            "pageIndex": String(pageIndex), //页码
            "pageSize": String(pageSize) //每页数量
          },
          power: [1],
          powerMsg: '个人合约列表'
        }
      })))
      if (repayload) {
        const res = getRes(yield call(getPersonalEnsure, repayload))
        if (resOk(res)) {
          const [result, pageIndex] = [_.get(res, 'data.records'), _.get(res, 'data.pageIndex')]
          const personalEnsures = yield select(({ home: { personalEnsures } }) => personalEnsures)
          if (result) {
            yield put({
              type: 'changeState',
              payload: {
                personalEnsures: callback ? [...result, ...personalEnsures] : result,
                personalEnsures_PageIndex: pageIndex
              }
            })
          }
          return res
        }
      }
    },

    //撤销委托订单 order cancel(撤单)
    * doCancelPersonEnsure({ payload = {} }, { call, put }) {
      const repayload = yield (asyncPayload(yield put({
        type: 'createRequestParams',
        payload: {
          "head": {
            "method": "order.cancel",
          },
          "param": {
            ...payload
          },
          power: [1],
          powerMsg: '撤销个人委托订单'
        }
      })))
      if (repayload) {
        const res = getRes(yield call(doCancelPersonEnsure, repayload))
        if (resOk(res)) {
          Message.success('撤销成功')
        }
      }
    },

    //查看委托订单明细 订单明细
    * getPersonEnsureDetail({ payload = {} }, { call, put, select }) {
      const repayload = yield (asyncPayload(yield put({
        type: 'createRequestParams',
        payload: {
          "head": {
            "method": "order.detail",
          },
          "param": {
            ...payload
          },
          power: [1],
          powerMsg: '查看委托订单明细'
        }
      })))
      if (repayload) {
        const res = getRes({
          data: {
            details: [
              {
                ctime: '2018-09-19 12:10:14',
                takefee: '100'
              },
              {
                ctime: '2018-09-19 12:10:14',
                takefee: '100'
              },
              {
                ctime: '2018-09-19 12:10:14',
                takefee: '100'
              }
            ]
          }
        })
        if (resOk(res)) {
          const { orderId } = payload
          const personalEnsures = yield select(({ home: { personalEnsures } }) => personalEnsures)
          const result = deepClone(personalEnsures)
          result.filter(item => item.orderId === orderId)[0].expand = res.data.details
          yield put({
            type: 'changeState',
            payload: {
              personalEnsures: result,
            }
          })
        }
      }
    },

    * getRecentTenHistory({ payload = {} }, { call, put }) {
      const repayload = yield (asyncPayload(yield put({
        type: 'createRequestParams',
        payload: {
          "head": {
            "method": "order.user_active_delegate"
          },
          "param": {
            "pageIndex": "0",//页码
            "pageSize": "100"//每页数量
          },
          power: [1],
          powerMsg: '最近十条'
        }
      })))
      if (repayload) {
        const res = getRes(yield call(getPersonalEnsure, repayload))
        if (resOk(res)) {
          const result = _.get(res, 'data.records')
          if (result) {
            yield put({
              type: 'changeState',
              payload: {
                personalEnsures: result
              }
            })
          }
          return res
        }
      }
    },

    // 下单（限价/市价）
    * postSideOrder({ payload = {} }, { call, put }) {
      const { side, method, price, amount } = payload
      const url = method === 'order.put_limit' ? postLimitOrder : postMarketOrder
      const repayload = yield (asyncPayload(yield put({
        type: 'createRequestParams',
        payload: {
          "head": {
            "method": method
          },
          "param": {
            "side": side,// 1:sell 2:buy
            "amount": amount,//买卖数量
            "price": price,//价格
            "takerFee": "0.01",
            "makerFee": "0.01",
            "source": url === postLimitOrder ? '我是现价测试单' : '我是市价测试单'//备注
          },
          powerMsg: '下单',
          power: [1]
        }
      })))
      if (repayload) {
        const res = getRes(yield call(url, repayload))

      }
    },
  },
  reducers: {
    clearState(state, { payload }) {
      return {
        ...state,
        latest_records: [],// 最新成交
        ensure_records: {},// 委托列表

        maxPrice: null, // 24h最高
        minPrice: null, // 24最低
        indexPrice: null, // 现货价格指数

        // minVaryPrice: null, //最小变动价位
        // minDealAmount: null, //最小交易量
        // keepBailRate: null,//维持保证金率
        // levelages: [],//杠杆

        latestPrice: null, //计算出来的，最新交易价格
        equitablePrice: null, // 计算出来的，合理价格

        personalEnsures: [],//个人委托列表
      }
    },
    getCurrentMarket(state, { payload = {} }) {
      const filterOne = state.marketList.filter(one => one.marketName === payload.marketName)[0] || {}
      return {
        ...state,
        marketName: filterOne.marketName,
        marketCode: filterOne.marketCode,
        minVaryPrice: filterOne.minVaryPrice,
        minDealAmount: filterOne.minDealAmount,
        keepBailRate: filterOne.keepBailRate,
        levelages: filterOne.levelages
      }
    }
  },
})
