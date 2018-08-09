import { joinModel, getRes, resOk, _, } from '@utils'
import modelExtend from '@models/modelExtend'


export default joinModel(modelExtend, {
  namespace: 'dashboard',
  state: {
    myname: 'home---------'

  },
  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {},
  reducers: {},
})
