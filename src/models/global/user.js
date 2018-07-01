import { getCurrentUser } from '@services/user'
import { getRes, resOk, joinModel } from '@utils'
import modelExtend from '@models/modelExtend'

export default joinModel(modelExtend, {
  namespace: 'user',
  state: {
    userInfo: {}
  },
  subscriptions: {
    setup({ dispatch, history }) {},
  },

  effects: {
    * getCurrentUser({ payload: { resolve, reject } }, { call, put }) {
      const res = getRes(yield call(getCurrentUser))
      if (resOk(res)) {
        yield put({
          type: 'changeState',
          payload: res
        })
        resolve(res)
      } else {
        reject()
      }
    },
  },
  reducers: {},
})
