import { _, getRes, resOk, joinModel, localSave, asyncPayload, delay } from '@utils'
import { PATH } from '@constants'
import { Toast } from '@components'
import modelExtend from '@models/modelExtend'
import {} from '@services/user'


export default joinModel(modelExtend, {
  namespace: 'asset',
  state: {
    name: 'asset',
  },
  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {},
  reducers: {},
})
