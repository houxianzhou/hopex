import { Toast } from '@components'
import { joinModel, getRes, resOk, formatNumber, _, formatJson, asyncPayload, deepClone } from '@utils'
import wss from '@services/SocketClient'
import modelExtend from '@models/modelExtend'
import { PATH } from '@constants'
import {
  getLatestRecord, getEnsureRecord, postLimitOrder, postMarketOrder,
  getKline, getPurseAssetList, getPersonalEnsure, doCancelPersonEnsure,
  getPosition, getPersonEnsureDetail, getAllMarkets, getAllMarketDetails, getLeverage, doUpdateLeverage,
  getKlineAllList, getPersonalEnsureHistory, getKlineDetail, getBuySellDetail,
  calculatePositionEnsureMoney, doUpdatePositionEnsureMoney, getMarketFee, getIntervals, doFullClose
} from "@services/trade"


export default joinModel(modelExtend, {
  namespace: 'home',
  state: {
    marketList: [], // 合约列表
    marketName: '', //当前合约名称
    marketCode: '', //当前合约code

    latest_records: [],// 最新成交
    ensure_records: {},// 委托列表
    asksFilter: '',
    bidsFilter: '',
    clickSelectOne: {}, //从最新成交和委托列表点击选择而来

    maxPrice24h: '', // 24h最高
    minPrice24h: '', // 24最低
    indexPrice: '', // 现货价格指数
    totalPrice24h: '',//z4小时交易总额
    latestPrice: '', //最新交易价格,
    latestPriceShown: '',//纯粹显示，去掉了加减号
    latestPriceChangePercent: '',//最新价相比24小时前价格的涨跌幅
    latestPriceChangePercentShown: '',//纯粹显示，去掉了加减号
    dollarPrice: '',//换算成美元
    latestPriceTrend: '',//1升，-1降
    reasonablePrice: '',//合理价格，从market.deatl接口拉过来的

    minVaryPrice: '', //最小变动价位
    minPricePrecision: '',//输入精度
    minDealAmount: '', //最小交易量
    minDealAmountDisplay: '',
    minLimitPrice: '',//最低允许卖价
    maxLimitPrice: '',//最高允许卖价
    availableMoney: '',//可用金额
    availableMoneyDisplay: '',
    userAllowTrade: true, //是否可交易
    marketAllowTrade: true,//是否可交易


    keepBailRate: '',//维持保证金率
    varyRange: '', // 委托列表区间,
    levelages: [],//当前合约杠杆列表
    leverage: null, //当前用户的杠杆
    leverageIsModify: null,//当前用户是否可以编辑杠杆

    personalEnsures: [],//个人委托列表
    positionList: [],//个人持仓列表
    personalEnsures_PageIndex: null, //未曾用过

    personalEnsureHistory: [],//最近10条委托历史
    deliveryHistory: [],//交割历史
    highlevelHistory: [],//强平历史
    reduceHistory: [],//减仓历史

  },
  subscriptions: {
    setup({ dispatch, history }) {
      const { location: { pathname } } = history
      if (pathname !== PATH.home) {
        dispatch({
          type: 'getAllMarketDetails'
        })
      }
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
          "head": {},
          "param": {
            "pageSize": "100",
            "lastId": "1"
          },
        }
      })))
      const res = getRes(yield call(getLatestRecord, repayload.param))
      if (resOk(res)) {
        yield put({
          type: 'updateLatestRecord',
          payload: {
            result: res.data,
          }
        })
        return res
      }
    },
    * getLatestRecordFromWs({ payload = {} }, { call, put, select }) {
      const latest_records = yield select(({ home: { latest_records = [] } }) => latest_records) || []
      const ws = wss.getSocket('ws')
      const repayload = yield (asyncPayload(yield put({
        type: 'createRequestParams',
        payload: {
          head: {
            "method": "deals.subscribe",
          },
          param: {
            lastId: _.get(latest_records[0], 'id'),
            "limit": 20
          }
        }
      })))
      if (repayload) {
        return ws.sendJson(repayload)
      }
    },
    * updateLatestRecord({ payload = {} }, { call, put, select }) {
      const { result = [] } = payload
      const latest_records = yield select(({ home: { latest_records = [] } }) => latest_records) || []
      yield put({
        type: 'changeState',
        payload: {
          latest_records: [
            ...result,
            ...latest_records,
          ].map((item = {}) => {
            const { id, time, fillPrice, fillQuantity, side } = item
            return {
              id,
              time,
              price: fillPrice,
              amount: fillQuantity,
              type: side,
              ...item,
            }
          }).slice(0, 100)
        }
      })
    },
    // 委托列表
    * getEnsureRecord({ payload = {} }, { call, put, select }) {
      const repayload = yield (asyncPayload(yield put({
        type: 'createRequestParams',
        payload: {
          "head": {
            "method": "contract.order_book",
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
        yield put({
          type: 'updateEnsureRecord',
          payload: {
            result: res.data
          }
        })
        return res
      }
    },
    * getEnsureRecordFromWs({ payload = {} }, { call, put, select }) {
      const ws = wss.getSocket('ws')
      const repayload = yield (asyncPayload(yield put({
        type: 'createRequestParams',
        payload: {
          head: {
            "method": "orderbook.subscribe",
          },
          param: {},
          power: [2],
        }
      })))
      if (repayload) {
        return ws.sendJson(repayload)
      }
    },
    * updateEnsureRecord({ payload = {} }, { call, put, select }) {
      const ensure_records = yield select(({ home: { ensure_records = [] } }) => ensure_records) || {}
      let { result = {} } = payload
      const Mapping = (result = []) => {
        return result.map((item = {}) => {
          const { orderPrice, orderQuantity, orderQuantityShow, exist } = item
          return {
            price: orderPrice,
            amount: orderQuantity,
            amountShow: orderQuantityShow,
            exist,
            ...item
          }
        })
      }
      result.asks = Mapping(result.asks)
      result.bids = Mapping(result.bids)
      let asks = [...(ensure_records.asks ? ensure_records.asks : [])]
      let bids = [...(ensure_records.bids ? ensure_records.bids : [])]
      const Filtering = (result = [], side = []) => {
        result.map((item = {}) => {
          const filterOne = _.findIndex(side, (one = {}) => String(one.price) === String(item.price))
          if (filterOne !== -1) {
            side.splice(filterOne, 1, item)
          } else {
            side.push(item)
          }
        })
      }
      if (_.has(result, 'asks')) {
        Filtering(result.asks, asks)
      }
      if (_.has(result, 'bids')) {
        Filtering(result.bids, bids)
      }
      const { asksFilter, bidsFilter } = result

      const remove = (result) => _.remove(result, (item = {}) => Number(item.amount) !== 0)

      result = {
        asks: _.orderBy(remove(asks), (item) => Number(item.price), ['desc']) || [],
        bids: _.orderBy(remove(bids), (item) => Number(item.price), ['desc']) || []
      }

      result.asks.map((item, index) => {
        item.type = '1'
        item.sum = _.sumBy(result.asks.slice(index, result.asks.length), ({ amount = 0 } = {}) => Number(amount))
      })
      result.bids.map((item, index) => {
        item.type = '2'
        item.sum = _.sumBy(result.bids.slice(0, index + 1), ({ amount = 0 } = {}) => Number(amount))
      })
      yield put({
        type: 'changeState',
        payload: {
          ensure_records: result,
          ...(asksFilter ? { asksFilter } : {}),
          ...(bidsFilter ? { bidsFilter } : {})
        }
      })
    },
    //获取盘口区间
    * getIntervals({ payload = {} }, { call, put }) {
      const repayload = yield (asyncPayload(yield put({
        type: 'createRequestParams',
        payload: {
          head: {},
          param: {},
        }
      })))
      if (repayload) {
        const res = getRes(yield call(getIntervals, _.get(repayload, 'param')))

        if (resOk(res)) {
          const { intervals = [] } = _.get(res, 'data')
          yield put({
            type: 'changeState',
            payload: {
              varyRange: intervals
            }
          })
        }
      }
    },

    // K线图全量查询，取消订阅，订阅
    * getKlineAllList({ payload = {} }, { call, put }) {
      const { startTime, endTime, interval } = payload
      const repayload = yield (asyncPayload(yield put({
        type: 'createRequestParams',
        payload: {
          head: {},
          param: {
            "startTime": startTime,
            "endTime": endTime,
            "interval": interval
          }
        }
      })))
      if (repayload) {
        const res = getRes(yield call(getKlineAllList, repayload.param))
        if (resOk(res)) {
          const result = _.get(res, 'data') || []
          return result
        }
      }
    },
    * doUnSubKlineAllListFromWs({ payload = {} }, { call, put }) {
      const ws = wss.getSocket('ws')
      return ws.sendJsonPromise({
        head: {
          "method": "kline.unsubscribe"
        },
        param: {}
      }, (e, data) => {
        let res
        if (e && e.data) {
          res = formatJson(e.data)
        }
        res = getRes(res)
        if (resOk(res)) {
          if (_.get(res, 'head.method') === 'kline.unsubscribe') {
            return true
          }
        }
      })
    },
    * getKlineFromWs({ payload = {} }, { call, put, select }) {
      const { interval } = payload
      const ws = wss.getSocket('ws')
      const repayload = yield (asyncPayload(yield put({
        type: 'createRequestParams',
        payload: {
          head: {
            "method": "kline.subscribe",
          },
          param: {
            interval
          },
        }
      })))
      if (repayload) {
        return ws.sendJson(repayload)
      }
    },

    // k线详情数据，基础合约信息
    * getKlineDetail({ payload = {} }, { call, put }) {
      const repayload = yield (asyncPayload(yield put({
        type: 'createRequestParams',
        payload: {
          head: {},
          param: {}
        }
      })))
      if (repayload) {
        const res = getRes(yield call(getKlineDetail, repayload.param))
        if (resOk(res)) {
          const result = _.get(res, 'data') || {}
          yield put({
            type: `updateKlineDetail`,
            payload: {
              result,
            }
          })
          return result
        }
      }
    },
    * getKlineDetailFromWs({ payload = {} }, { call, put }) {
      const ws = wss.getSocket('ws')
      const repayload = yield (asyncPayload(yield put({
        type: 'createRequestParams',
        payload: {
          head: {
            "method": "price.subscribe",
          },
          param: {}
        }
      })))
      if (repayload) {
        return ws.sendJson(repayload)
      }
    },
    * updateKlineDetail({ payload = {} }, { call, put }) {
      const { result = {}, request } = payload
      const {
        direction, marketPrice: indexPrice,
        lastPrice: latestPrice, lastPriceToUSD: dollarPrice, changePercent24: percent,
        fairPrice: reasonablePrice, price24Max: maxPrice24h, price24Min: minPrice24h,
        amount24h: totalPrice24h, allowTrade,
      } = result

      yield put({
        type: 'changeState',
        payload: {
          ...direction !== '0' ? { latestPriceTrend: Number(direction) } : {},
          maxPrice24h,
          minPrice24h,
          indexPrice,
          latestPrice,
          reasonablePrice,
          latestPriceShown: _.isString(latestPrice) ? latestPrice.replace(/[+-]/, '') : null,//纯粹显示，去掉了加减号
          totalPrice24h,
          latestPriceChangePercent: percent,
          latestPriceChangePercentShown: _.isString(percent) ? percent.replace(/[+-]/, '') : null,//纯粹显示，去掉了加减号
          dollarPrice: dollarPrice,
          marketAllowTrade: allowTrade
        }
      })
    },

    // 获取杠杆
    * getLeverage({ payload = {} }, { call, put }) {
      const repayload = yield (asyncPayload(yield put({
        type: 'createRequestParams',
        payload: {
          head: {},
          param: {},
          power: [2]
        }
      })))
      if (repayload) {
        const res = getRes(yield call(getLeverage, repayload.param))
        if (resOk(res)) {
          const { leverage, editable, varyRange, leverages, maintenanceMarginRate: keepBailRate } = _.get(res, 'data')
          yield put({
            type: 'changeState',
            payload: {
              leverage,
              leverageIsModify: editable,
              varyRange,
              leverages,
              keepBailRate
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
          head: {},
          param: {
            leverage
          },
          powerMsg: '更新合约对应的杠杆倍数',
          power: [1]
        }
      })))
      if (repayload) {
        const res = getRes(yield call(doUpdateLeverage, repayload.param))
        if (resOk(res)) {
          Toast.tip('杠杆修改成功')
          return res
        } else {
          return Promise.reject('修改杠杆失败')
        }
      }
    },

    //合约列表 market.list
    * getAllMarketDetails({ payload = {} }, { call, put }) {
      const repayload = yield (asyncPayload(yield put({
        type: 'createRequestParams',
        payload: {
          "head": {},
          "param": {},
        }
      })))
      const res = getRes(yield call(getAllMarketDetails, {}))
      if (resOk(res)) {
        let result = []
        _.get(res, 'data').map((item = {}) => {
          const { name, list = [] } = item
          list.forEach((item2 = {}) => {
            item2.sortType = name
            result.push(item2)
          })
        })

        if (result) {
          const { search } = payload
          yield put({
            type: 'updateAllMarketDetails',
            payload: {
              result,
              search,
            }
          })
          return result
        }
      } else {
        return Promise.reject('合约列表获取失败')
      }
    },
    * getAllMarketDetailsFromWs({ payload = {} }, { call, put }) {
      const ws = wss.getSocket('ws')
      const repayload = yield (asyncPayload(yield put({
        type: 'createRequestParams',
        payload: {
          head: {
            "method": "market.subscribe",
          },
          param: {}
        }
      })))
      if (repayload) {
        return ws.sendJson(repayload)
      }
    },
    * updateAllMarketDetails({ payload = {} }, { call, put, select }) {
      const { request } = payload
      const marketList = yield select(({ home: { marketList = [] } }) => marketList) || {}
      let { result = [], search } = payload

      result = result.map((item = {}) => {
        const { contractCode, contractName } = item
        return {
          ...item,
          marketCode: contractCode,
          marketName: contractName,
        }
      })
      let filterOne = result.filter(item => item.marketCode === search)[0] || result[0]

      result.map((item = {}) => {
        const filterItem = _.findIndex(marketList, (one = {}) => String(one.marketCode) === String(item.marketCode))
        if (filterItem !== -1) {
          marketList.splice(filterItem, 1, {
            ...marketList[filterItem],
            ...item,
          })
        } else {
          marketList.push(item)
        }
      })
      yield put({
        type: 'changeState',
        payload: {
          marketList
        }
      })
      if (request !== 'ws' && filterOne) {
        // 注意ws的更新会导致getCurrentMarket执行
        yield put({
          type: 'getCurrentMarket',
          payload: filterOne
        })
      }
    },

    //获取买入卖出模块数据依赖项
    * getBuySellDetail({ payload = {} }, { call, put }) {
      const { side, price = '0', amount = '0' } = payload
      const repayload = yield (asyncPayload(yield put({
        type: 'createRequestParams',
        payload: {
          "head": {
            "method": "*"
          },
          "param": {
            side,
            price: Number(price),
            amount: Number(amount),
            "leverage": 0
          },
        }
      })))
      const res = getRes(yield call(getBuySellDetail, repayload))
      if (resOk(res)) {
        const result = _.get(res, 'data') || {}

        yield put({
          type: 'changeState',
          payload: {
            minVaryPrice: result.minPriceMovement,
            minPriceMovementDisplay: result.minPriceMovementDisplay,
            minPricePrecision: result.minPricePrecision,

            minDealAmount: result.minTradeNum,
            minDealAmountDisplay: result.minTradeNumDisplay,

            availableMoney: result.availableBalance,
            availableMoneyDisplay: result.availableBalanceDisplay,


            maxLimitPrice: result.maxBuyPrice,
            minLimitPrice: result.minSellPrice,
            userAllowTrade: result.userAllowTrade,
            marketAllowTrade: result.marketAllowTrade
          }
        })
        return result
      }
    },

    //获取当前用户合约的费率
    * getMarketFee({ payload = {} }, { call, put }) {
      const repayload = yield (asyncPayload(yield put({
        type: 'createRequestParams',
        payload: {
          param: {},
          power: [1],
          powerMsg: '获取当前用户合约的费率'
        }
      })))
      if (repayload) {
        const res = getRes(yield call(getMarketFee, repayload.param))
        if (resOk(res)) {
          const result = _.get(res, 'data') || {}
          return result
        }
      }
    },

    //个人持仓列表
    * getPosition({ payload = {} }, { call, put, select }) {
      const repayload = yield (asyncPayload(yield put({
        type: 'createRequestParams',
        payload: {
          "head": {
            "method": "user.position"
          },
          "param": {},
          power: [1],
          powerMsg: '个人持仓列表'
        }
      })))
      if (repayload) {
        const res = getRes(yield call(getPosition, {}))
        if (resOk(res)) {
          const result = _.get(res, 'data')
          if (result) {
            const positionList = yield select(({ home: { positionList = [] } }) => positionList)
            // 解决轮训问题
            result.map((item = {}) => {
              const exsit = positionList.filter((one = {}) => one.contractCode === item.contractCode)[0] || {}
              if (exsit && exsit.inputValue) {
                item.inputValue = exsit.inputValue
              }
            })
            yield put({
              type: 'changeState',
              payload: {
                positionList: result.map((item = {}) => {
                  const {
                    contractCode, contractName, lastPrice, fairPrice, positionQuantity,
                    entryPrice, positionMargin, maintMarginRate, maintMargin, liquidationPrice, unrealisedPnl, unrealisedPnlPcnt
                  }
                    = item
                  return {
                    ...item,
                    market: contractCode,
                    marketName: contractName,
                    lastPriceShow: lastPrice,
                    reasonablePriceShow: fairPrice,
                    amount: positionQuantity,
                    averagePriceShow: entryPrice,
                    positionMoneyShow: positionMargin,
                    keepMoneyShow: maintMargin,
                    overPriceShow: liquidationPrice,
                    floatProfitShow: unrealisedPnl,
                    profitRate: unrealisedPnlPcnt
                  }
                })
              }
            })
            return result
          }
        }
      }
    },

    //用户输入修改持仓列
    * doInputChangePosition({ payload = {} }, { call, put, select }) {
      const { market, value } = payload
      const positionList = yield select(({ home: { positionList = [] } }) => deepClone(positionList))
      const filterOne = positionList.filter((item = {}) => item.market === market)[0] || {}
      filterOne.inputValue = value
      yield put({
        type: 'changeState',
        payload: {
          positionList
        }
      })
    },

    // 计算持仓保证金
    * calculatePositionEnsureMoney({ payload = {} }, { call, put }) {
      const { marginChange } = payload
      const repayload = yield (asyncPayload(yield put({
        type: 'createRequestParams',
        payload: {
          "head": {},
          "param": {
            change: marginChange
          },
          power: [1],
          powerMsg: '计算持仓保证金'
        }
      })))
      if (repayload) {
        const res = getRes(yield call(calculatePositionEnsureMoney, repayload.param))
        if (resOk(res)) {
          const result = _.get(res, 'data')
          if (result) {
            return result
          }
        }
      }
    },

    // 增加或减少持仓保证金
    * doUpdatePositionEnsureMoney({ payload = {} }, { call, put }) {
      const { assetName, assetChange } = payload
      const repayload = yield (asyncPayload(yield put({
        type: 'createRequestParams',
        payload: {
          "head": {},
          "param": {
            assetName,
            assetChange,
          },
          power: [1],
          powerMsg: '增加或减少持仓保证金'
        }
      })))
      if (repayload) {
        const res = getRes(yield call(doUpdatePositionEnsureMoney, repayload))
        if (resOk(res)) {
          const action = Number(assetChange) > 0 ? '增加' : '减少'
          Toast.tip(`${action}保证金成功`)
          return res
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
            "method": "user.active_delegate"
          },
          "param": {},
          power: [1],
          powerMsg: '个人合约列表'
        }
      })))
      if (repayload) {
        const res = getRes(yield call(getPersonalEnsure, {}))
        if (resOk(res)) {
          const [result, pageIndex] = [_.get(res, 'data'), _.get(res, 'data.pageIndex')]
          const personalEnsures = yield select(({ home: { personalEnsures = [] } }) => personalEnsures)
          if (result) {
            yield put({
              type: 'changeState',
              payload: {
                personalEnsures: callback ? [...result, ...personalEnsures] : result.map((item = {}) => {
                  const {
                    contractName, contractCode, orderQuantity, orderPrice,
                    fillQuantity, avgFillMoney, orderMargin, fee
                  } = item
                  return ({
                    ...item,
                    marketName: contractName,
                    market: contractCode,
                    amount: orderQuantity,
                    price: orderPrice,
                    dealAmount: fillQuantity,
                    avgDealMoney: avgFillMoney,
                    delegateMoney: orderMargin,
                    dealFee: fee
                  })
                }),
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
      const { market, orderId } = payload
      const repayload = yield (asyncPayload(yield put({
        type: 'createRequestParams',
        payload: {
          "head": {},
          "param": {},
          power: [1],
          powerMsg: '撤销个人委托订单'
        }
      })))
      if (repayload && market) {
        const res = getRes(yield call(doCancelPersonEnsure, {
          contractCode: market,
          orderId
        }))
        if (resOk(res)) {
          Toast.tip('撤销成功')
          return true
        }
      }
    },

    //查看订单明细
    * getOrderDetail({ payload = {} }, { call, put, }) {
      const repayload = yield (asyncPayload(yield put({
        type: 'createRequestParams',
        payload: {
          "head": {},
          "param": {
            ...payload,
            pageIndex: '0',
            pageSize: '100'
          },
          power: [1],
          powerMsg: '查看订单明细'
        }
      })))
      if (repayload) {
        const res = getRes(yield call(getPersonEnsureDetail, repayload.param))
        if (resOk(res)) {
          const result = _.get(res, 'data')
          if (result) {
            return result.map((item = {}) => {
              const { fillPrice: price, fillQuantity: amount } = item
              return {
                ...item,
                price,
                amount
              }
            })
          }
        }
      }
    },

    //最近10条委托历史
    * getHistory({ payload = {} }, { call, put, select }) {
      const { type, page, pageSize = 10 } = payload
      let prev
      let historyType
      let historyList
      switch (type) {
        case '1': {
          historyType = ["1", "2", '3', '4'] //1限价单，2市价单,"3": 限价全平单,"4":市价全平单一起就是最近委托
          historyList = 'personalEnsureHistory'
          prev = yield select(({ home: { personalEnsureHistory = [] } }) => personalEnsureHistory)
        }
          break
        case '5': {
          historyType = ['5'] //交割单
          historyList = 'deliveryHistory'
          prev = yield select(({ home: { deliveryHistory = [] } }) => deliveryHistory)
        }
          break
        case '6': {
          historyType = ['6'] //强平单
          historyList = 'highlevelHistory'
          prev = yield select(({ home: { highlevelHistory = [] } }) => highlevelHistory)
        }
          break
        case '7': {
          historyType = ['7'] //自动减仓
          historyList = 'reduceHistory'
          prev = yield select(({ home: { reduceHistory = [] } }) => reduceHistory)
        }
      }
      const repayload = yield (asyncPayload(yield put({
        type: 'createRequestParams',
        payload: {
          "head": {},
          "param": {
            contractCodeList: [],
            typeList: historyType,
            "side": "0",
            "startTime": "0",
            "endTime": "0",
          },
          power: [1],
          powerMsg: '最近十条'
        }
      })))
      if (repayload) {
        const res = getRes(yield call(getPersonalEnsureHistory, repayload, {
          "page": page,
          "limit": String(pageSize)
        }))
        if (resOk(res)) {
          let [result, total] = [_.get(res, 'data.result'), _.get(res, 'data.totalCount')]
          if (result) {
            result = result.map((item = {}) => {
              const {
                contractCode: market, contractName: marketName, orderQuantity: amount,
                orderPrice: price, fillQuantity: dealAmount, avgFillMoney: avgDealMoney,
                closePosPNL: unwindProfit, fee: dealFee
              } = item
              return {
                ...item,
                market,
                marketName,
                amount,
                price,
                dealAmount,
                avgDealMoney,
                unwindProfit,
                dealFee
              }
            })
            // 区分有分页的和没有分页的两种
            if (page) {
              return {
                result,
                historyList,
                total: Math.ceil(total / pageSize)
              }
            } else {
              // 此处为解决轮询的问题
              result.map((item = {}) => {
                const exsit = prev.filter((one = {}) => one.orderId === item.orderId)[0] || {}
                if (exsit && exsit.expand) {
                  item.expand = exsit.expand
                }
              })
              yield put({
                type: 'changeState',
                payload: {
                  [historyList]: result
                }
              })
            }
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
      const priceAfter = method === 'order.put_limit' ? price : undefined
      const repayload = yield (asyncPayload(yield put({
        type: 'createRequestParams',
        payload: {
          "head": {
            "method": method
          },
          "param": {
            "side": side,// 1:sell 2:buy
            "orderQuantity": amount,//买卖数量
            "orderPrice": priceAfter,//价格

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

    // 全平
    * doFullClose({ payload = {} }, { call, put, select }) {
      const { market, price } = payload
      const repayload = yield (asyncPayload(yield put({
        type: 'createRequestParams',
        payload: {
          "head": {},
          "param": {
            "orderPrice": price,//价格
          },
          powerMsg: '全平',
          power: [1]
        }
      })))
      if (repayload) {
        repayload.param.contractCode = market
        const res = getRes(yield call(doFullClose, repayload))
        if (resOk(res)) {
          Toast.success('委托成功')
          return true
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


        minVaryPrice: '', //最小变动价位
        minDealAmount: '', //最小交易量
        minLimitPrice: '',//最低允许卖价
        maxLimitPrice: '',//最高允许卖价
        availableMoney: '',//可用金额

        personalEnsureHistory: [],//最近10条委托历史
        personalEnsures: [],//个人委托列表
        positionList: [],//个人持仓列表
      }
    },
    getCurrentMarket(state, { payload = {} }) {
      const filterOne = state.marketList.filter(one => one.marketName === payload.marketName)[0] || {}
      return {
        ...state,
        marketName: filterOne.marketName,
        marketCode: filterOne.marketCode,
      }
    }
  },
})
