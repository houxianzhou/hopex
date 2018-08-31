import { _, getRes, resOk, joinModel, localSave, asyncPayload, delay } from '@utils'
import { PATH } from '@constants'
import { Toast } from '@components'
import modelExtend from '@models/modelExtend'
import {
  getAssetSummary, getAssetAddress, getWithdrawParameter,
  SendEmailToWithdraw, getAssetRecord
} from '@services/trade'


export default joinModel(modelExtend, {
  namespace: 'asset',
  state: {
    withDrawPage: 1,
    summary: {},
    detail: [],

    address: '',// BTC存款地址
    CodeImage: ''//存款二维码地址
  },
  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    // 获取用户钱包明细
    * getAssetSummary({ payload = {} }, { call, put, select }) {
      const detail = yield select(({ asset: { detail = [] } }) => detail) || []
      const { forceUpdate = false } = payload
      if (forceUpdate || _.isEmpty(detail)) {
        const repayload = yield (asyncPayload(yield put({
          type: 'createRequestParams',
          payload: {
            "head": {},
            "param": {},
            powerMsg: '钱包明细交易概况',
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
              return result
            }
          }
        }
      } else {
        return Promise.resolve({ detail })
      }
    },

    // 获取存款钱包地址
    * getAssetAddress({ payload = {} }, { call, put, select }) {
      const { asset } = payload
      const repayload = yield (asyncPayload(yield put({
        type: 'createRequestParams',
        payload: {
          "head": {},
          "param": {
            asset
          },
          powerMsg: '获取存款钱包地址',
          power: [1]
        }
      })))
      if (repayload) {
        const res = getRes(yield call(getAssetAddress, {
          asset: _.get(repayload, 'param.asset')
        }))
        if (resOk(res)) {
          const result = _.get(res, 'data')
          if (result) {
            const detail = yield select(({ asset: { detail = [] } }) => detail) || []
            const { address, prompts, qrCodeImgUrl } = result
            const detailnew = detail.map((item = {}) => {
              if (item.assetName === asset) {
                return {
                  ...item,
                  address,
                  prompts,
                  qrCodeImgUrl
                }
              }
              return item
            })
            yield put({
              type: 'changeState',
              payload: {
                detail: detailnew
              }
            })
            return result
          }
        }
      }
    },

    // 获取提现参数
    * getWithdrawParameter({ payload = {} }, { call, put, select }) {
      const { asset } = payload
      const repayload = yield (asyncPayload(yield put({
        type: 'createRequestParams',
        payload: {
          "head": {},
          "param": {
            asset
          },
          powerMsg: '获取提现参数',
          power: [1]
        }
      })))
      if (repayload) {
        const res = getRes(yield call(getWithdrawParameter, {
          asset: _.get(repayload, 'param.asset')
        }))
        if (resOk(res)) {
          const result = _.get(res, 'data')
          if (result) {
            const detail = yield select(({ asset: { detail = [] } }) => detail) || []
            const { allowWithdraw, commission, enableTwoFactories, isValid, maxAmount, minAmount, prompts: promptsWithDraw } = result
            const detailnew = detail.map((item = {}) => {
              if (item.assetName === asset) {
                return {
                  ...item,
                  allowWithdraw,
                  commission,
                  enableTwoFactories,
                  isValid,
                  maxAmount,
                  minAmount,
                  promptsWithDraw
                }
              }
              return item
            })
            yield put({
              type: 'changeState',
              payload: {
                detail: detailnew
              }
            })
            return result
          }
        }
      }
    },

    // 发送提现确认邮件
    * SendEmailToWithdraw({ payload = {} }, { call, put, select }) {
      const email = yield select(({ user: { userInfo: { email } = {} } = {} }) => email) || []
      const { address, asset, amount } = payload
      const repayload = yield (asyncPayload(yield put({
        type: 'createRequestParams',
        payload: {
          "head": {},
          "param": {
            email,
            addr: address,
            asset,
            amount
          },
          powerMsg: '发送提现确认邮件',
          power: [1]
        }
      })))
      if (repayload) {
        const res = getRes(yield call(SendEmailToWithdraw, repayload))
        if (resOk(res)) {
          console.log(res, '-')
          // const result = _.get(res, 'data')
          // if (result) {
          //   const detail = yield select(({ asset: { detail = [] } }) => detail) || []
          //   const { allowWithdraw, commission, enableTwoFactories, isValid, maxAmount, minAmount, prompts: promptsWithDraw } = result
          //   const detailnew = detail.map((item = {}) => {
          //     if (item.assetName === asset) {
          //       return {
          //         ...item,
          //         allowWithdraw,
          //         commission,
          //         enableTwoFactories,
          //         isValid,
          //         maxAmount,
          //         minAmount,
          //         promptsWithDraw
          //       }
          //     }
          //     return item
          //   })
          //   yield put({
          //     type: 'changeState',
          //     payload: {
          //       detail: detailnew
          //     }
          //   })
          //   return result
          // }
        }
      }
    },

    // 资金记录
    * getAssetRecord({ payload = {} }, { call, put, select }) {
      const { page = '1' } = payload
      const repayload = yield (asyncPayload(yield put({
        type: 'createRequestParams',
        payload: {
          "head": {},
          "param": {},
          powerMsg: '获取资金记录',
          power: [1]
        }
      })))
      if (repayload) {
        const res = getRes(yield call(getAssetRecord, {
          page,
          limit: '20'
        }))
        if (resOk(res)) {
          console.log(res, '-')
          // const result = _.get(res, 'data')
          // if (result) {
          //   const detail = yield select(({ asset: { detail = [] } }) => detail) || []
          //   const { allowWithdraw, commission, enableTwoFactories, isValid, maxAmount, minAmount, prompts: promptsWithDraw } = result
          //   const detailnew = detail.map((item = {}) => {
          //     if (item.assetName === asset) {
          //       return {
          //         ...item,
          //         allowWithdraw,
          //         commission,
          //         enableTwoFactories,
          //         isValid,
          //         maxAmount,
          //         minAmount,
          //         promptsWithDraw
          //       }
          //     }
          //     return item
          //   })
          //   yield put({
          //     type: 'changeState',
          //     payload: {
          //       detail: detailnew
          //     }
          //   })
          //   return result
          // }
        }
      }
    }
  },
  reducers: {},
})
