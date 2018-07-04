import { joinModel, getRes, resOk } from '@utils'
import modelExtend from '@models/modelExtend'
import { getLatestRecord, getEnsureRecord } from "@services/trade"

export default joinModel(modelExtend, {
  namespace: 'home',
  state: {
    market: 'BTCBCH',// 合约
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
    * getLatestRecord({ payload }, { call, put }) {
      const res = getRes(yield call(getLatestRecord))
      if (resOk(res)) {
        console.log(res)
      }
    },
    * getEnsureRecord({ payload }, { call, put }) {
      const res = getRes(yield call(getEnsureRecord, {
        "head": {
          "method": "market.active_delegate",
          "msgType": "request",
          "packType": "1",
          "lang": "cn",
          "version": "1.0.0",
          "timestamps": "1439261904",
          "serialNumber": "56",
          "userId": "56",
          "userToken": "56"
        },
        "param": {
          "market": "BTCUSD永续",//合约
          "pageSize": "100",//不能大于101
          "interval": "0"//固定值
        }
      }))
      if (resOk(res)) {
        yield put({
          type: 'changeState',
          payload: { ensure_records: res }
        })
        return res
      }
    },
  },

  reducers: {
  },
})
