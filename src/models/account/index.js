import { _, getRes, resOk, joinModel, localSave, asyncPayload, delay } from '@utils'
import { PATH } from '@constants'
import modelExtend from '@models/modelExtend'

export default joinModel(modelExtend, {
  namespace: 'account',
  state: {
    myAccountPage: 1,
  },
  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {},
  reducers: {},
})
