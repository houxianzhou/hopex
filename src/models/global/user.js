import { routerRedux } from 'dva/router'
import { getCurrentUser, doLogin, doLoginOut } from '@services/user'
import { getRes, resOk, joinModel, localSave, asyncPayload } from '@utils'
import modelExtend from '@models/modelExtend'

export default joinModel(modelExtend, {
  namespace: 'user',
  state: {
    userInfo: localSave.get('userInfo') || {}
  },
  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    * doLogin({ payload = {} }, { call, put, select }) {
      const res = getRes(yield call(doLogin, {
        param: {
          ...payload, loginType: "web", version: '1.0'
        }
      }))
      if (resOk(res)) {
        const { enabledTwoFactories, token, userId } = res.data
        if (enabledTwoFactories) {
          // 谷歌二次验证
        } else {
          const payload = {
            userInfo: {
              userId,
              userToken: token
            }
          }
          yield put({
            type: 'changeState',
            payload: payload
          })
          localSave.set('userInfo', payload)
          yield put(routerRedux.push('/home'))
        }
      }
    },
    * doLoginOut({ payload = {} }, { call, put, select }) {
      yield put({
        type: 'changeState',
        payload: {
          userInfo: {}
        }
      })
      localSave.remove('userInfo')
      const res = getRes(yield call(doLoginOut))
    },
    * getCurrentUser({ payload: { resolve, reject } }, { call, put }) {
      // const res = { data: { "userInfo": { "userId": "56", "userToken": "56" } } }
      // // getRes(yield call(getCurrentUser))
      // if (resOk(res)) {
      //   yield put({
      //     type: 'changeState',
      //     payload: res.data
      //   })
      //   resolve(res)
      // } else {
      //   reject()
      // }
    },
  },
  reducers: {},
})
