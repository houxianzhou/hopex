import { _, getRes, resOk, joinModel, localSave, asyncPayload, delay } from '@utils'
import { PATH } from '@constants'
import modelExtend from '@models/modelExtend'
import {
  GetEnableGoogleVertifyCode
} from '@services/user'


export default joinModel(modelExtend, {
  namespace: 'account',
  state: {
    myAccountPage: 2,
  },
  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    * GetEnableGoogleVertifyCode({ payload = {} }, { call, put, select }) {
      const repayload = yield (asyncPayload(yield put({
        type: 'createRequestParams',
        payload: {
          // head: {
          //   "method": "market.leverage_select"
          // },
          param: {},
          powerMsg: '查询杠杆倍数',
          power: [1]
        }
      })))
      const res = getRes(yield call(GetEnableGoogleVertifyCode, payload));
    },
  },
  reducers: {},
})
