import { message as Message } from 'antd'
import { Toast } from '@components'
import { joinModel, getRes, resOk, formatNumber, _, formatJson, asyncPayload, deepClone } from '@utils'
import wss from '@services/SocketClient'
import modelExtend from '@models/modelExtend'
import {
  getLatestRecord, getEnsureRecord, postLimitOrder, postMarketOrder,
  getKline, getPurseAssetList, getPersonalEnsure, doCancelPersonEnsure,
  getPosition, getPersonEnsureDetail, getAllMarkets, getLeverage, doUpdateLeverage,
  getKlineAllList, getPersonalEnsureHistory, getKlineDetail
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
    clickSelectOne: {}, //从最新成交和委托列表点击选择而来

    maxPrice24h: '', // 24h最高
    minPrice24h: '', // 24最低
    indexPrice: '', // 现货价格指数
    totalPrice24h: '',//z4小时交易总额
    latestPrice: '', //最新交易价格,改为从tradeview k线接口拉取
    latestPriceChangePercent: '',//最新价相比24小时前价格的涨跌幅
    dollarPrice: '',//换算成美元
    latestPriceTrend: 1,//1||0合理趋势，比上次大为1小就是0
    equitablePrice: '', // 计算出来的，合理价格


    minVaryPrice: '', //最小变动价位
    minDealAmount: '', //最小交易量
    minLimitPrice: '',//最低允许卖价
    maxLimitPrice: '',//最高允许卖价


    keepBailRate: null,//维持保证金率
    levelages: [],//当前合约杠杆列表
    dealMoney: null,//结算货币
    leverage: null, //当前用户的杠杆

    personalEnsures: [],//个人委托列表
    personalEnsures_PageIndex: null, //最新成交价格与上次比较的趋势
    personalEnsureHistory: [],//最近10条委托历史

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
            "interval": "0", //固定值
          },
          power: [2],
        }
      })))
      const res = getRes(yield call(getEnsureRecord, repayload))

      if (resOk(res)) {
        const result = {
          asks: _.orderBy(formatNumber(_.get(res.data, 'asks'), ['price', 'amount']), ['price'], ['desc']) || [],
          bids: _.orderBy(formatNumber(_.get(res.data, 'bids'), ['price', 'amount']), ['price'], ['desc']) || []
        }

        result.asks.map((item, index) => {
          item.type = '1'
          item.sum = _.sumBy(result.asks.slice(index, result.asks.length), ({ amount = 0 } = {}) => amount)
        })
        result.bids.map((item, index) => {
          item.type = '2'
          item.sum = _.sumBy(result.bids.slice(0, index + 1), ({ amount = 0 } = {}) => amount)
        })

        const [asksLast, bidsFirst] = [result.asks[result.asks.length > 8 ? 7 : result.asks.length - 1], result.bids[0]]
        const equitablePrice = (_.get(asksLast, 'price') * _.get(bidsFirst, 'amount')
          + _.get(bidsFirst, 'price') * _.get(asksLast, 'amount')) / (_.get(asksLast, 'amount') + _.get(bidsFirst, 'amount'))
        yield put({
          type: 'changeState',
          payload: {
            ensure_records: result,
            equitablePrice: formatNumber(equitablePrice, 'p')
          }
        })
        return res
      }
    },

    //K线图全量查询
    * getKlineAllList({ payload = {} }, { call, put }) {
      const { startTime, endTime, interval } = payload
      const repayload = yield (asyncPayload(yield put({
        type: 'createRequestParams',
        payload: {
          head: {
            "method": "market.kline",
          },
          param: {
            "startTime": startTime,
            "endTime": endTime,
            "interval": interval
          }
        }
      })))
      if (repayload) {
        const res = getRes(yield call(getKlineAllList, repayload))
        if (resOk(res)) {
          const result = _.get(res, 'data') || {}
          const {
            records = []
          } = result
          return records
        }
      }
    },

    * getKlineDetail({ payload = {} }, { call, put }) {
      const repayload = yield (asyncPayload(yield put({
        type: 'createRequestParams',
        payload: {
          head: {
            "method": "market.detail",
          },
          param: {}
        }
      })))
      if (repayload) {
        const res = getRes(yield call(getKlineDetail, repayload))
        if (resOk(res)) {
          const result = _.get(res, 'data') || {}
          const {
            records = [], maxPrice24h, minPrice24h, marketPrice,
            priceLast, totalPrice24h, percent, dollarPrice
          } = result
          yield put({
            type: 'changeState',
            payload: {
              maxPrice24h,
              minPrice24h,
              indexPrice: marketPrice,
              latestPrice: priceLast,
              totalPrice24h,
              latestPriceChangePercent: percent,
              dollarPrice: dollarPrice,
            }
          })
          return records
        }
      }
    },

    * getKlineAllListFromWs({ payload = {} }, { call, put }) {
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
        let res
        if (e && e.data) {
          res = formatJson(e.data)
        }
        res = getRes(res)
        if (resOk(res)) {
          if (_.get(res, 'head.method') === 'kline.query') {
            return _.get(res, 'data.records')
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

    // 获取杠杆
    * getLeverage({ payload = {} }, { call, put }) {
      const repayload = yield (asyncPayload(yield put({
        type: 'createRequestParams',
        payload: {
          head: {
            "method": "market.leverage_select"
          },
          param: {},
          power: [2]
        }
      })))
      if (repayload) {
        const res = getRes(yield call(getLeverage, repayload))
        if (resOk(res)) {
          const result = _.get(res, 'data.leverage')
          yield put({
            type: 'changeState',
            payload: {
              leverage: result
            }
          })
        }
      }
    },

    // 更新杠杆
    * doUpdateLeverage({ payload = {} }, { call, put, select }) {
      const { leverage } = payload

      const repayload = yield (asyncPayload(yield put({
        type: 'createRequestParams',
        payload: {
          head: {
            "method": "market.leverage_set"
          },
          param: {
            leverage
          },
          powerMsg: '更新合约对应的杠杆倍数',
          power: [1]
        }
      })))
      if (repayload) {
        const res = getRes(yield call(doUpdateLeverage, repayload))
        if (resOk(res)) {
          return res
        } else {
          return Promise.reject('修改杠杆失败')
        }
      }
    },

    //现货价格指数，24最高，24h最低
    * getImportantPriceFromWs({ payload = {} }, { call, put }) {
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
        }).then(res => {
          return res
        })
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
            "method": "balance.query"
          },
          "param": {
            "assetNameList": []
          },
          powerMsg: '钱包balance.query',
          power: [1]
        }
      })))
      if (repayload) {
        const res = getRes(yield call(getPurseAssetList, repayload))
        if (resOk(res)) {
          const result = _.get(res, 'data')
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
      const { pageIndex = 0, pageSize = 100, callback } = payload
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

    //最近10条委托历史
    * getPersonalEnsureHistory({ payload = {} }, { call, put }) {
      const repayload = yield (asyncPayload(yield put({
        type: 'createRequestParams',
        payload: {
          "head": {
            "method": "user.order_history"
          },
          "param": {
            "side": "0",
            "startTime": "0",
            "endTime": "0",
            "pageIndex": "",
            "pageSize": "10"
          },
          power: [1],
          powerMsg: '最近十条'
        }
      })))
      if (repayload) {
        const res = getRes(yield call(getPersonalEnsureHistory, repayload))
        if (resOk(res)) {
          const result = _.get(res, 'data.records')
          if (result) {
            yield put({
              type: 'changeState',
              payload: {
                personalEnsureHistory: result
              }
            })
          }
          return res
        }
      }
    },

    // 下单（限价/市价）
    * postSideOrder({ payload = {} }, { call, put, select }) {
      const model = yield select(({ user, }) => (user))
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
            "source": url === postLimitOrder ? `我是现价测试${side === 1 ? '卖' : '买'}单,数量${amount},价格${price}` : '我是市价测试单'//备注
          },
          powerMsg: '下单',
          power: [1]
        }
      })))
      if (repayload) {
        let prev = _.get(repayload, 'param.source')
        _.set(repayload, 'param.source', `浏览器，${prev},用户id：${_.get(repayload, 'head.userId')},邮箱：${model.userInfo.email}`)
        const res = getRes(yield call(url, repayload))
        if (resOk(res)) {
          Toast.success('委托成功')
        }
      }
    },
  },
  reducers: {
    clearState(state, { payload }) {
      return {
        ...state,
        latest_records: [],// 最新成交
        ensure_records: {},// 委托列表

        maxPrice24h: null, // 24h最高
        minPrice24h: null, // 24最低
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
        levelages: filterOne.levelages,
        dealMoney: filterOne.dealMoney,
        maxLimitPrice: filterOne.maxLimitPrice,
        minLimitPrice: filterOne.minLimitPrice
      }
    }
  },
})
