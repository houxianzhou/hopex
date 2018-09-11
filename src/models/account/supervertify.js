import { _, getRes, resOk, joinModel, localSave, asyncPayload, delay } from '@utils'
import { PATH } from '@constants'
import { Toast } from '@components'
import { getCertificationAll, doVertifyIdCard, doVertifyBank, doRemoveBindBank } from '@services/trade'

export default {
  state: {
    superVertifyPage: 1,
    bank: {},
    idCard: {}
  },
  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    * getCertificationAll({ payload = {} }, { call, put }) {
      const repayload = yield (asyncPayload(yield put({
        type: 'createRequestParams',
        payload: {
          head: {},
          param: {},
          power: [2]
        }
      })))
      if (repayload) {
        const res = getRes(yield call(getCertificationAll, {}))
        if (resOk(res)) {
          const { bank, idCard } = _.get(res, 'data')
          yield put({
            type: 'changeState',
            payload: {
              bank,
              idCard
            }
          })
        }
      }
    },
    * doVertifyIdCard({ payload = {} }, { call, put }) {
      const { name, card } = payload
      const repayload = yield (asyncPayload(yield put({
        type: 'createRequestParams',
        payload: {
          head: {},
          param: {
            realName: name,
            idCardNo: card
          },
          power: [2]
        }
      })))
      if (repayload) {
        const res = getRes(yield call(doVertifyIdCard, repayload))
        if (resOk(res)) {
          const result = _.get(res, 'data')
          if (result) {
            Toast.tip('实名认证成功')
            return true
          }
        }
      }
    },
    * doVertifyBank({ payload = {} }, { call, put }) {
      const { bank, bankName } = payload
      const repayload = yield (asyncPayload(yield put({
        type: 'createRequestParams',
        payload: {
          head: {},
          param: {
            bankName: bankName,
            bankNo: bank
          },
          power: [2]
        }
      })))
      if (repayload) {
        const res = getRes(yield call(doVertifyBank, repayload))
        if (resOk(res)) {
          const result = _.get(res, 'data')
          if (result) {
            Toast.tip('绑定银行卡成功')
            return true
          }
        }
      }
    },
    * doRemoveBindBank({ payload = {} }, { call, put }) {
      const repayload = yield (asyncPayload(yield put({
        type: 'createRequestParams',
        payload: {
          head: {},
          param: {},
          power: [2]
        }
      })))
      if (repayload) {
        const res = getRes(yield call(doRemoveBindBank, {}))
        if (resOk(res)) {
          const result = _.get(res, 'data')
          if (result) {
            return true
          }
        }
      }
    },
  },
  reducers: {},
}
