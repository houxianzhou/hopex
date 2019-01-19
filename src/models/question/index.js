import { _, getRes, resOk, joinModel, localSave, asyncPayload, delay } from '@utils'
import { PATH } from '@constants'
import { Toast } from '@components'
import modelExtend from '@models/modelExtend'
import {
  example, example1, example2, getContractList, getContractDetail
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

  effects: {
    * getContractList({ payload = {} }, { call, put, select }) { // 获取合约列表
      // const res = getRes(yield call(SendEmailToEnableTwoFacotires, payload));
      const res = getRes(yield call(getContractList, payload, (err) => {
        Toast.tip(err.errStr)
      }));
      if (resOk(res)) {
        return res;
      }
    },
    * getContractDetail({ payload = {} }, { call, put, select }) { // 获取合约详情
      const res = getRes(yield call(getContractDetail, payload, (err) => {
        Toast.tip(err.errStr)
      }));
      if (resOk(res)) {
        return res;
      }
    },
  },
  reducers: {},
})
