import { joinModel } from '@utils'
import modelExtend from '@models/modelExtend'
import { getLatestRecord } from "@services/trade"

export default joinModel(modelExtend, {
  namespace: 'home',
  state: {
    name: 'home',
    market: 'BTCBCH',// 合约

  },
  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    * getLatestRecord({ payload }, { call, put }) {
      const res = yield call(getLatestRecord)
    },
  },

  reducers: {},
})
