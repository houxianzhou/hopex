import { joinModel, getRes, resOk, formatNumber, _, formatJson, asyncPayload } from '@utils'
import wss from '@services/SocketClient'
import modelExtend from '@models/modelExtend'
import {
  getLatestRecord, getEnsureRecord, postLimitOrder, postMarketOrder,
  getKline
} from "@services/trade"


export default joinModel(modelExtend, {
  namespace: 'home',
  state: {
    marketList: [
      {
        name: 'BTCUSD永续',
      },
      {
        name: '合约2'
      },
      {
        name: '合约3'
      }
    ],
    // 合约名称
    market: 'BTCUSD永续',// 合约
    numberToFixed: 2, // 小数点位数
    // 最新成交
    latest_records: [],
    // 委托列表
    ensure_records: {},
    // 价格指标
    maxPrice: null, // 24h最高
    minPrice: null, // 24最低
    indexPrice: null, // 现货价格指数

    latestPrice: null, //计算出来的，最新交易价格
    equitablePrice: null // 计算出来的，合理价格
  },
  subscriptions: {
    setup({ dispatch, history }) {
      dispatch({
        type: 'startInit'
      })
    },
  },

  effects: {
    * startInit({ payload = {} }, { call, put }) {
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
        const [bidsLast, asksFirst] = [result.bids[result.bids.length - 1], result.asks[0]]
        yield put({
          type: 'changeState',
          payload: {
            ensure_records: result,
            equitablePrice: formatNumber((_.get(bidsLast, 'price') * _.get(asksFirst, 'amount')
              + _.get(asksFirst, 'price') * _.get(bidsLast, 'amount')) / _.get(asksFirst, 'amount') + _.get(bidsLast, 'amount'))
          }
        })
        return res
      }
    },

    //K线图
    * getKline({ payload = {} }, { call, put }) {
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
          },
          power: [1]
        }
      })))
      return ws1.sendJsonPromise(repayload, (e) => {
        const res = getRes(e)
        if (resOk(res)) {
          const result = formatJson(res.data)
          if (_.get(result, 'data.head.method') === 'kline.query') {
            return _.get(result, 'data.data.records')
          }
        }
      })
    },

    //现货价格指数，24最高，24h最低
    * getImportantPrice({ payload = {} }, { call, put }) {
      const ws2 = wss.getSocket('ws2')
      const repayload = yield (asyncPayload(yield put({
        type: 'createRequestParams',
        payload: {
          "event": "subscribe",
          "channel": "market",
          "pair": "BTCUSD",
          "type": 1
        }
      })))
      return ws2.sendJson(repayload)
    },

    // 下单（限价/市价）
    * postSideOrder({ payload = {} }, { call, put }) {
      const { side, method, price, amount } = payload
      const url = method === 'order.put_limit' ? postLimitOrder : postMarketOrder
      const res = getRes(yield call(url,
        {
          "head": {
            "method": method,
            "msgType": "request",
            "packType": "1",
            "lang": "cn",
            "version": "1.0.0",
            "timestamps": `${Date.now()}`,
            "serialNumber": "56",
            "userId": "56",
            "userToken": "56"
          },
          "param": {
            "market": "BTCUSD永续",//合约
            "side": side,// 1:sell 2:buy
            "amount": amount,//买卖数量
            "price": price,//价格
            "takerFee": "0.01",
            "makerFee": "0.01",
            "source": "我是限价单测试"//备注
          }
        }
      ))
    },
  },

  reducers: {},
})
