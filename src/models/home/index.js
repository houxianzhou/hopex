import { joinModel, getRes, resOk } from '@utils'
import modelExtend from '@models/modelExtend'
import { ws } from '@components'
import {
  getLatestRecord, getEnsureRecord, postLimitOrder, postMarketOrder,
  getKline
} from "@services/trade"

export default joinModel(modelExtend, {
  namespace: 'home',
  state: {
    // 合约名称
    market: 'BTCUSD永续',// 合约
    // 最新成交
    latest_pageIndex: '1',
    latest_pageSize: '19',
    latest_pageTotal: null,
    latest_records: [],
    // 委托列表
    ensure_records: {}
  },
  subscriptions: {

    setup({ dispatch, history }) {

    },
  },

  effects: {
    // 最新成交列表
    * getLatestRecord({ payload = {} }, { call, put }) {
      const { mode = 'ws' } = payload
      if (mode === 'ws') {

      } else {
        const payload = yield put({
          type: 'createRequestParams',
          payload: {
            "head": {
              "method": "market.deals",
              "serialNumber": "57",
            },
            "param": {
              "pageSize": "100",
              "lastId": "1"
            }
          }
        })
        const res = getRes(yield call(getLatestRecord, payload))
        if (resOk(res)) {
          yield put({
            type: 'changeState',
            payload: { latest_records: res.data.records }
          })
          return res
        }
      }
    },
    // 委托列表
    * getEnsureRecord({ payload = {} }, { call, put }) {
      const { mode = 'ws' } = payload
      if (mode === 'ws') {
        ws.onConnect = function () {
          ws.sendJson({
            "head": {
              "method": "server.ping",
              "msgType": "wsrequest",
              "packType": "1",
              "lang": "cn",
              "version": "1.0.0",
              "timestamps": "1439261904",
              "serialNumber": "1439261904",
              "userId": "56",
              "userToken": "56"
            },
            "param": {}
          })
          ws.onMessage = function (e) {
            const msg = e.data
            console.log(msg)
          }
        }
      } else {
        const payload = yield put({
          type: 'createRequestParams',
          payload: {
            "head": {
              "method": "market.active_delegate",
              "serialNumber": "56",
            },
            "param": {
              "pageSize": "100", //不能大于101
              "interval": "0" //固定值
            }
          }
        })
        const res = getRes(yield call(getEnsureRecord, payload))
        if (resOk(res)) {
          yield put({
            type: 'changeState',
            payload: { ensure_records: res.data }
          })
          return res
        }
      }
    },
    //K线图
    * getKline({ payload = {} }, { call, put }) {
      const { mode = 'ws' } = payload
      if (mode === 'ws') {

      } else {
        const payload = yield put({
          type: 'createRequestParams',
          payload: {
            "head": {
              "method": "market.kline",
              "serialNumber": "57",
            },
            "param": {
              "market": "BTCBCH",
              "startTime": "12345678",
              "endTime": "12345699",
              "interval": "86400"
            }
          }
        })
        const res = getRes(yield call(getKline, payload))
        // if (resOk(res)) {
        //   yield put({
        //     type: 'changeState',
        //     payload: { ensure_records: res.data }
        //   })
        //   return res
        // }
      }
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
            "side": side,//1:sell 2:buy
            "amount": amount,//买卖数量
            "price": price,//价格
            "takerFee": "0.01",
            "makerFee": "0.01",
            "source": "我是限价单测试"//备注
          }
        }
      ))
      // if (resOk(res)) {
      //   yield put({
      //     type: 'changeState',
      //     payload: { ensure_records: res }
      //   })
      //   return res
      // }
    },
  },

  reducers: {},
})
