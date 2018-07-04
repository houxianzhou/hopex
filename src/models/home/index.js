import { joinModel, getRes, resOk } from '@utils'
import modelExtend from '@models/modelExtend'
import { getLatestRecord } from "@services/trade"

export default joinModel(modelExtend, {
  namespace: 'home',
  state: {
    market: 'BTCBCH',// 合约
    // 最新成交
    latest_pageIndex: '1',
    latest_pageSize: '19',
    latest_pageTotal: null,
    latest_records: [],
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
  },

  reducers: {},
})
