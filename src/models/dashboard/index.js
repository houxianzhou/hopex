import { joinModel, getRes, resOk, _, } from '@utils'
import modelExtend from '@models/modelExtend'
import {getIndexInfo} from '@services/user.js';


export default joinModel(modelExtend, {
  namespace: 'dashboard',
  state: {
    myname: 'home'
  },
  subscriptions: {
    setup({ dispatch, history }) {

    },
  },

  effects: {
    // * getIndexInfo
    * getIndexInfo({ payload = {} }, { call, put, select }) { // 获取google验证信息
      const res = getRes(yield call(getIndexInfo, payload));
      if (resOk(res)) {
        return res;
      }
      return false;
    },
  },
  reducers: {},
})
