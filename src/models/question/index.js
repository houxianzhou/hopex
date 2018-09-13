import { _, getRes, resOk, joinModel, localSave, asyncPayload, delay } from '@utils'
import { PATH } from '@constants'
import { Toast } from '@components'
import modelExtend from '@models/modelExtend'
import {
  example, example1, example2
} from '@services/question'


export default joinModel(modelExtend, {
  namespace: 'question',
  state: {
    myName: 'model 是question'
  },
  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {},
  reducers: {},
})
