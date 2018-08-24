import { _, joinModel } from '@utils'
import modelExtend from '@models/modelExtend'

export default joinModel(modelExtend, {
  namespace: 'modal',
  state: {
    name: 'dealDetail',
    state: true,
  },

  effects: {
    * startInit({ payload = {} }, { call, put, select }) {

    },
  },
  reducers: {},
})
