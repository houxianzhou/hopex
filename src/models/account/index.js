import { _, getRes, resOk, joinModel, localSave, asyncPayload, delay } from '@utils'
import { PATH } from '@constants'
import { Toast } from '@components'
import modelExtend from '@models/modelExtend'
import {
  GetEnableGoogleVertifyCode,
  GetLast10LoginLog,
  CheckGoogleCode,
  SendEmailToEnableTwoFacotires,
  doEnableGoogleVertify,
  GetUserInfo,
  ModifyPassword
} from '@services/user'


export default joinModel(modelExtend, {
  namespace: 'account',
  state: {
    myAccountPage: 2, // 1首页  2启用google二次验证  3. 修改密码  4.开启google验证 邮箱页面  5. 关闭google页面
  },
  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    * GetEnableGoogleVertifyCode({ payload = {} }, { call, put, select }) { // 获取google验证信息
      const res = getRes(yield call(GetEnableGoogleVertifyCode, payload));
      return res;
    },
    * GetLast10LoginLog({ payload = {} }, { call, put, select }) {  // 获取最近十次登录记录
      const res = getRes(yield call(GetLast10LoginLog, payload));
      return res;
    },
    * CheckGoogleCode({ payload = {} }, { call, put, select }) { // 验证google
      const res = getRes(yield call(CheckGoogleCode, payload));
      if (resOk(res)) {
        yield put({
          type: 'changeState',
          payload: {
            myAccountPage: 4
          }
        })
      }
    },
    * SendEmailToEnableTwoFacotires({ payload = {} }, { call, put, select }) { // 开启google验证发送邮件
      // const res = getRes(yield call(SendEmailToEnableTwoFacotires, payload));
      const res = getRes(yield call(SendEmailToEnableTwoFacotires, payload, (err) => {
        Toast.tip(err.errStr)
      }))
    },
    * doEnableGoogleVertify({ payload = {} }, { call, put, select }) { // 进行google验证
      const res = getRes(yield call(doEnableGoogleVertify, payload, (err) => {
        Toast.top(res.errStr);
      }));
      if (resOk(res)) {
        yield put({
          type: 'changeState',
          payload: {
            myAccountPage: 1
          }
        })
      }
    },
    * GetUserInfo({ payload = {} }, { call, put, select }) { // 获取个人信息
      const res = getRes(yield call(GetUserInfo, payload, (err) => {
        Toast.tip(err.errStr);
      }));
      if (resOk(res)) {
        return res;
      }
    },
    * ModifyPassword({ payload = {} }, { call, put, select }) { // 获取个人信息
      const res = getRes(yield call(ModifyPassword, payload, (err) => {
        Toast.tip(err.errStr);
      }));
      if (resOk(res)) {
        yield put({
          type: 'routerGo',
          payload: PATH.login
        })
      }
    },
  },
  reducers: {},
})
