import {
  getCurrentUser,
  doLogin,
  doVertifyLogin,
  doLoginOut,
  doRegister,
  doRegisterVerify,
  doEmailExists,
  doResetPassword,
  doSendEmailCode,
  doEnableGoogleVertify,
  GetEnableGoogleVertifyCode,
  doDisbaleGoogleVertify
} from '@services/user'
import { _, getRes, resOk, joinModel, localSave, asyncPayload } from '@utils'
import { Toast } from '@components'
import { PATH } from '@constants'
import modelExtend from '@models/modelExtend'

export default joinModel(modelExtend, {
  namespace: 'user',
  state: {
    userInfo: localSave.get('userInfo') || {},
    isOnlie: true
  },
  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    * doLogin({ payload = {} }, { call, put, select }) {
      const res = getRes(yield call(doLogin, {
          param: {
            ...payload, loginType: "pcweb"
          },
        },
        (err) => {
          Toast.tip(err)
          console.log(err)
        }
      ))
      if (resOk(res)) {
        const { enabledTwoFactories, token, userId, email } = res.data
        if (enabledTwoFactories) {
          // 谷歌二次验证
        } else {
          if (token && userId) {
            const payload = {
              userId,
              userToken: token,
              email
            }
            yield put({
              type: 'changeState',
              payload: {
                userInfo: payload
              }
            })
            localSave.set('userInfo', payload)
            yield put({
              type: 'routerGo',
              payload: PATH.home
            })
          } else {

          }
        }
      }
    },
    * doVertifyLogin({ payload = {} }, { call, put, select }) {
      const res = getRes(yield call(doVertifyLogin, payload))
    },
    * doLoginOut({ payload = {} }, { call, put, select }) {
      // yield (doLoginOut())
      yield put({
        type: 'changeState',
        payload: {
          userInfo: {}
        }
      })
      localSave.remove('userInfo')
      //

    },
    * doRegister({ payload = {} }, { call, put, select }) {
      const res = getRes(yield call(doRegister, {
        param: payload
      }))
      // {"data":"","ret":0,"errCode":null,"errStr":null}
      // yield put({
      //   type: 'changeState',
      //   payload: {
      //     userInfo: {}
      //   }
      // })
    },
    * doRegisterVerify({ payload = {} }, { call, put, select }) {
      const res = getRes(yield call(doRegisterVerify, payload))
      // {"data":"","ret":0,"errCode":null,"errStr":null}
    },
    * doEmailExists({ payload = {} }, { call, put, select }) {
      const res = getRes(yield call(doEmailExists, payload))
      // {"data":"","ret":0,"errCode":null,"errStr":null}
    },
    * doSendEmailCode({ payload = {} }, { call, put, select }) {
      const res = getRes(yield call(doSendEmailCode, payload))
      // {"data":"","ret":0,"errCode":null,"errStr":null}
    },
    * doResetPassword({ payload = {} }, { call, put, select }) {
      const res = getRes(yield call(doResetPassword, {
        param: payload
      }))
      // {"data":"","ret":0,"errCode":null,"errStr":null}
    },

    * GetEnableGoogleVertifyCode({ payload = {} }, { call, put, select }) {
      const res = getRes(yield call(GetEnableGoogleVertifyCode, payload))
      // {"data":{"securityCode":"KQ4ESTSIK5HDAMBSJVLVEVSDGNGVAMSJ","qrImageUrl":"https://user.hopex.com/api/qrcode?qrCodeWidth=300&qrCodeHeight=300&chl=otpauth%3A%2F%2Ftotp%2Fxiaoyi.wei%40bcsystech.com%3Fsecret%3DKQ4ESTSIK5HDAMBSJVLVEVSDGNGVAMSJ%26issuer%3Dhopex.com"},"ret":0,"errCode":null,"errStr":null}
    },
    * doEnableGoogleVertify({ payload = {} }, { call, put, select }) {
      const res = getRes(yield call(doEnableGoogleVertify, payload))
      // {"data":"","ret":0,"errCode":null,"errStr":null}
    },
    * doDisbaleGoogleVertify({ payload = {} }, { call, put, select }) {
      const res = getRes(yield call(doDisbaleGoogleVertify, payload))
      // {"data":"","ret":0,"errCode":null,"errStr":null}
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
