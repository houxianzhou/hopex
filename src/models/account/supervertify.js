import { _, getRes, resOk, joinModel, localSave, asyncPayload, delay } from '@utils'
import { PATH } from '@constants'
import { Toast } from '@components'
import { getCertificationAll } from '@services/trade'


export default {
  state: {
    superVertifyPage: 1
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
          // const { leverage, editable, varyRange, leverages, maintenanceMarginRate: keepBailRate } = _.get(res, 'data')
          // yield put({
          //   type: 'changeState',
          //   payload: {
          //     leverage,
          //     leverageIsModify: editable,
          //     varyRange,
          //     leverages,
          //     keepBailRate
          //   }
          // })
        }
      }
    },
  },
  reducers: {},
}
