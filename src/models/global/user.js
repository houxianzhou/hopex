import {
  getCurrentUser,
  doLogin,
  doVertifyLogin,
  doLoginOut,
  getAllCountryCode,
  doRegister,
  doRegisterVerify,
  doEmailExists,
  doResetPassword,
  doSendEmailCode,
  doVertifyCode,
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
          Toast.tip(err.errStr)
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
      yield put({
        type: 'changeState',
        payload: {
          userInfo: {}
        }
      })
      localSave.remove('userInfo')
    },
    * getAllCountryCode({ payload = {} }, { call, put, select }) {
      const res = getRes(yield call(getAllCountryCode))
      if (resOk(res)) {
        return _.get(res, 'data')
      }
    },
    * doRegister({ payload = {} }, { call, put, select }) {
      const res = getRes(yield call(doRegister, {
        param: payload
      }, (err) => {
        Toast.tip(err.errStr)
      }))
      if (resOk(res)) {
        return res
      }
    },
    * doRegisterVerify({ payload = {} }, { call, put, select }) {
      const res = getRes(yield call(doRegisterVerify, payload, (err) => {
        Toast.tip(err.errStr)
      }))
      if (resOk(res)) {
        if (res) {
          Toast.tip('注册成功，请登录')
        }
      }
    },
    * doEmailExists({ payload = {} }, { call, put, select }) {
      const res = getRes(yield call(doEmailExists, payload))
      if (resOk(res)) {
        const result = _.get(res, 'data')
        console.log(res)
        if (_.isBoolean(result)) {
          if (result) {
            return result
          } else {
            Toast.tip('邮箱未注册')
          }
        }
      }
      // {"data":"","ret":0,"errCode":null,"errStr":null}
    },
    * doSendEmailCode({ payload = {} }, { call, put, select }) {
      const res = getRes(yield call(doSendEmailCode, payload,(err) => {
        Toast.tip(err.errStr)
      }))
      // {"data":"","ret":0,"errCode":null,"errStr":null}
    },
    * doVertifyCode({ payload = {} }, { call, put, select }) {
      const res = getRes(yield call(doVertifyCode, payload, (err) => {
        Toast.tip(err.errStr)
      }))
      if (resOk(res)) {
        return res
      }
    },
    * doResetPassword({ payload = {} }, { call, put, select }) {
      const res = getRes(yield call(doResetPassword, {
        param: payload
      }, (err) => {
        Toast.tip(err.errStr)
      }))
      if (resOk(res)) {
        Toast.tip('重置密码成功，请登录')
      }
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
