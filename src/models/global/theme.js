import { getRes, resOk, joinModel } from '@utils'
import modelExtend from '@models/modelExtend'
import { THEME } from '@constants'

export default joinModel(modelExtend, {
  namespace: 'theme',
  state: {
    theme: THEME.DARK,
    dragIndex: [
      'LatestRecord'
      // 'EntrustList',
    ]
  },
  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {},
  reducers: {},
})
