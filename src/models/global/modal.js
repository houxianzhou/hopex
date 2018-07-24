import { _,  joinModel } from '@utils'
import modelExtend from '@models/modelExtend'

export default joinModel(modelExtend, {
  namespace: 'modal',
  state: {
    title: '',
    state: false,

  },
  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    * doLogin({ payload = {} }, { call, put, select }) {

    },
  },
  reducers: {},
})
