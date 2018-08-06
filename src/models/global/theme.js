import { joinModel } from '@utils'
import modelExtend from '@models/modelExtend'
import { THEME } from '@constants'

export default joinModel(modelExtend, {
  namespace: 'theme',
  state: {
    lang: "cn",
    version: "1.0.0",
    RG:1,//红绿切换 1为正常的绿涨红跌，0为红涨绿跌
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
