import { joinModel } from '@utils'
import modelExtend from '@models/modelExtend'
import { THEME } from '@constants'

export default joinModel(modelExtend, {
  namespace: 'theme',
  state: {
    lang: "cn",
    version: "1.0.0",
    theme: THEME.DARK,
    dragIndex: [
      'LatestRecord'
    ]
  },
  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {},
  reducers: {},
})
