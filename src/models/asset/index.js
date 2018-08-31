import { _, getRes, resOk, joinModel, localSave, asyncPayload, delay } from '@utils'
import { PATH } from '@constants'
import { Toast } from '@components'
import modelExtend from '@models/modelExtend'
import { getAssetSummary } from '@services/trade'


export default joinModel(modelExtend, {
  namespace: 'asset',
  state: {
    withDrawPage: 1,
    summary: {},
    detail: []

  },
  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    * getAssetSummary({ payload = {} }, { call, put }) {
      const repayload = yield (asyncPayload(yield put({
        type: 'createRequestParams',
        payload: {
          "head": {},
          "param": {},
          powerMsg: '交易概况',
          power: [1]
        }
      })))
      if (repayload) {
        const res = getRes(yield call(getAssetSummary, {
          lang: _.get(repayload, 'param.lang')
        }))
        if (resOk(res)) {
          const result = _.get(res, 'data')
          if (result) {
            const { summary, detail } = result
            yield put({
              type: 'changeState',
              payload: {
                summary,
                detail
              }
            })
          }
        }
      }
    },
  },
  reducers: {},
})
