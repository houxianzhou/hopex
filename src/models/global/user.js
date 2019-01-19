import {
  getCurrentUser,
  doLogin,
  doVertifyLogin,
  doLoginOut,
  getAllCountryCode,
  getDefaultCountryFromIp,
  doRegister,
  doSendRegistVerificationCode,
  doRegisterVerify,
  doEmailExists,
  doResetPassword,
  doSendEmailCode,
  doVertifyCode,
  doEnableGoogleVertify,
  GetEnableGoogleVertifyCode,
  doDisbaleGoogleVertify
} from '@services/user'
import { _, getRes, resOk, joinModel, localSave, asyncPayload, delay, } from '@utils'
import { Toast } from '@components'
import { PATH } from '@constants'
import modelExtend from '@models/modelExtend'

export default joinModel(modelExtend, {
  namespace: 'user',
  state: {
    userInfo: localSave.get('userInfo') || {},
    isOnlie: true,
    showChain: _.get(localSave.get('showOTC'), 'showChain') || false,
    showLegal: _.get(localSave.get('showOTC'), 'showLegal') || false
  },
  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    * doLogin({ payload = {} }, { call, put, select }) {
      const { redirect, ...rest } = payload
      const res = getRes(yield call(doLogin, {
          param: {
            ...rest, loginType: "pcweb"
          },
        },
        (err) => {
          Toast.tip(err.errStr)
        }
      ))
      if (resOk(res)) {
        const { enabledTwoFactories, token, userId, email, showChain = false, showLegal = false } = res.data
        yield put({
          type: 'changeState',
          payload: {
            showChain,
            showLegal
          }
        })
        localSave.set('showOTC', {
          showChain,
          showLegal
        })
        if (enabledTwoFactories) {
          return {
            email,
            userId,
          }
          // 谷歌二次验证
        } else {
          if (token && userId) {
            const payload = {
              userId,
              userToken: token,
              email,
              redirect,
            }
            yield put({
              type: 'doLoginPrepare',
              payload
            })
          }
        }
      }
    },
    * doVertifyLogin({ payload = {} }, { call, put, select }) {
      const { email, userId, redirect, } = payload
      const res = getRes(yield call(doVertifyLogin, payload, (err) => {
        Toast.tip(err.errStr)
      }))
      if (resOk(res)) {
        const { data } = res
        if (data) {
          yield put({
            type: 'doLoginPrepare',
            payload: {
              email,
              userId,
              userToken: data,
              redirect,
            }
          })
          Toast.tip('登录成功')
        }
      }
    },
    * doLoginPrepare({ payload = {} }, { call, put }) {
      const { redirect, ...rest } = payload
      yield put({
        type: 'changeState',
        payload: {
          userInfo: rest,
        }
      })
      localSave.set('userInfo', rest)
      localSave.set('recordEmail', { email: payload.email })
      yield put({
        type: 'routerGo',
        payload: redirect || PATH.home
      })
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
    * getDefaultCountryFromIp({ payload = {} }, { call, put, select }) {
      const res = getRes(yield call(getDefaultCountryFromIp))
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
    * doSendRegistVerificationCode({ payload = {} }, { call, put, select }) {
      const res = getRes(yield call(doSendRegistVerificationCode, payload, (err) => {
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
          const result = yield (asyncPayload(delay(2000)))
          if (result) {
            yield put({
              type: 'routerGo',
              payload: PATH.login
            })
            localSave.set('newPassword', { ...payload, ...{ msg: '注册成功' } })
          }
        }
      }
    },
    * doEmailExists({ payload = {} }, { call, put, select }) {
      const res = getRes(yield call(doEmailExists, payload))
      if (resOk(res)) {
        const result = _.get(res, 'data')
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
      const res = getRes(yield call(doSendEmailCode, payload, (err) => {
        Toast.tip(err.errStr)
      }))
      if (resOk(res)) {
        return res
      }
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
        // Toast.tip('重置密码成功')
        const result = yield (asyncPayload(delay(0)))
        if (result) {
          yield put({
            type: 'routerGo',
            payload: {
              pathname: PATH.login,
            }
          })
          localSave.set('newPassword', { ...payload, ...{ msg: '重置密码成功' } })
        }
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
