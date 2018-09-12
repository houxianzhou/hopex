import { _, getRes, resOk, joinModel, localSave, asyncPayload, delay } from '@utils'
import { PATH } from '@constants'
import { Toast } from '@components'
import modelExtend from '@models/modelExtend'
import {
  getAssetSummary, getAssetAddress, getWithdrawParameter,
  SendEmailToWithdraw, getAssetRecord, doWithdrawApply,
  getExchangeRate, getBuyParameter, buyOTC, getOrder, getSellParameter
} from '@services/trade'
import { GetUserInfo } from '@services/user'


export default joinModel(modelExtend, {
  namespace: 'asset',
  state: {
    withDrawPage: 1,
    buyPage: 1,
    summaryAll: {},//交易页面钱包
    detailAll: [],//交易页面钱包
    summary: {},//资产管理页面钱包明细
    detail: [],//资产管理页面钱包明细
    detailDigital: [//资产管理数字货币,只有两个
      {
        assetName: 'BTC'
      },
      {
        assetName: 'ETH'
      }
    ],
    detailLegal: [//资产管理页面法币，三个都要
      {
        assetName: 'BTC'
      },
      {
        assetName: 'ETH'
      },
      {
        assetName: 'USDT'
      }
    ],

    record: [],// 数字货币资金记录
    recordTotalPage: '',// 数字货币资金记录总页数
  },
  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {

    // 获取用户钱包明细
    * getAssetSummary({ payload = {} }, { call, put, select }) {
      const { fetchAllAsset } = payload //此参数用来区分合约交易页面的钱包模块，那个需要所有的钱包，这里只有两个钱包
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
            lang: _.get(repayload, 'param.lang'),
            fetchAllAsset
          }))
          if (resOk(res)) {
            const result = _.get(res, 'data')
            if (result) {
              const { summary, detail } = result
              yield put({
                type: 'changeState',
                payload: {
                  ...fetchAllAsset ? { summaryAll: summary } : { summary },
                  ...fetchAllAsset ? { detailAll: detail } : { detail },
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

    //----------------------------------------------------------------------------------法币
    // 获取订单
    * getOrder({ payload = {} }, { call, put, select }) {
      const repayload = yield (asyncPayload(yield put({
        type: 'createRequestParams',
        payload: {
          "head": {},
          "param": {},
          powerMsg: '获取订单',
          power: [1]
        }
      })))
      if (repayload) {
        const res = getRes(yield call(getOrder, { ...payload }))
        if (resOk(res)) {
          const result = _.get(res, 'data.result')
          return result
        }
      }
    },

    // 人民币购买数字货币
    * buyOTC({ payload = {} }, { call, put, select }) {
      const repayload = yield (asyncPayload(yield put({
        type: 'createRequestParams',
        payload: {
          "head": {},
          "param": {
            ...payload
          },
          powerMsg: '人民币购买数字货币',
          power: [1]
        }
      })))
      if (repayload) {
        const res = getRes(yield call(buyOTC, repayload))
        if (resOk(res)) {
          const result = _.get(res, 'data')
          if (result) {
            window.location.href = result
          }
        }
      }
    },

    // 获取法币买入数字货币参数
    * getBuyParameter({ payload = {} }, { call, put, select }) {
      const { coinCode = '', } = payload
      const repayload = yield (asyncPayload(yield put({
        type: 'createRequestParams',
        payload: {
          "head": {},
          "param": {},
          powerMsg: '获取法币买入数字货币参数',
          power: [1]
        }
      })))
      if (repayload) {
        const res = getRes(yield call(getBuyParameter, {
          coinCode,
        }))
        if (resOk(res)) {
          const result = _.get(res, 'data')
          if (result) {
            const { minBuyRMB, maxBuyRMB, hasOpenBuyOrder, forbidden, idCardVerified, realName, allowLegalBuy, remarks } = result
            const detailLegal = yield select(({ asset: { detailLegal = [] } }) => detailLegal) || []
            const detailLegalNew = detailLegal.map((item = {}) => {
              if (item.assetName === coinCode) {
                return {
                  ...item,
                  ...result
                }
              }
              return item
            })
            yield put({
              type: 'changeState',
              payload: {
                detailLegal: detailLegalNew
              }
            })
            return result
          }
        }
      }
    },

    // 获取法币买入数字货币参数
    * getSellParameter({ payload = {} }, { call, put, select }) {
      const { coinCode = '', } = payload
      const repayload = yield (asyncPayload(yield put({
        type: 'createRequestParams',
        payload: {
          "head": {},
          "param": {},
          powerMsg: '获取法币买出数字货币参数',
          power: [1]
        }
      })))
      if (repayload) {
        const res = getRes(yield call(getSellParameter, {
          coinCode,
        }))
        if (resOk(res)) {
          const result = _.get(res, 'data')
          if (result) {
            const { remarks: sell_remarks, realName: sell_realName, bankNo: sell_bankNo } = result
            const detailLegal = yield select(({ asset: { detailLegal = [] } }) => detailLegal) || []
            const detailLegalNew = detailLegal.map((item = {}) => {
              if (item.assetName === coinCode) {
                return {
                  ...item,
                  sell_remarks,
                  sell_realName,
                  sell_bankNo
                }
              }
              return item
            })
            yield put({
              type: 'changeState',
              payload: {
                detailLegal: detailLegalNew
              }
            })
            return result
          }
        }
      }
    },

    // 获取对人民币汇率
    * getExchangeRate({ payload = {} }, { call, put, select }) {
      const { coinCode = '', priceArrow = '' } = payload
      const repayload = yield (asyncPayload(yield put({
        type: 'createRequestParams',
        payload: {
          "head": {},
          "param": {},
          powerMsg: '获取对人民币汇率',
          power: [1]
        }
      })))
      if (repayload) {
        const res = getRes(yield call(getExchangeRate, {
          coinCode,
          priceArrow
        }))
        if (resOk(res)) {
          const result = _.get(res, 'data')
          if (result) {
            const detailLegal = yield select(({ asset: { detailLegal = [] } }) => detailLegal) || []
            const detailLegalNew = detailLegal.map((item = {}) => {
              if (item.assetName === coinCode) {
                return {
                  ...item,
                  exchangeRate: result
                }
              }
              return item
            })
            yield put({
              type: 'changeState',
              payload: {
                detailLegal: detailLegalNew
              }
            })
            return result
          }
        }
      }
    },

    //----------------------------------------------------------------------------------数字货币

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
            const detailDigital = yield select(({ asset: { detailDigital = [] } }) => detailDigital) || []
            const { address, prompts, qrCodeImgUrl } = result
            const detailDigitalNew = detailDigital.map((item = {}) => {
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
                detailDigital: detailDigitalNew
              }
            })
            return result
          }
        }
      }
    },

    // 数字货币获取提现参数
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
            const detailDigital = yield select(({ asset: { detailDigital = [] } }) => detailDigital) || []
            const { allowWithdraw, commission, enableTwoFactories, isValid, maxAmount, minAmount, prompts: promptsWithDraw } = result
            const detailDigitalNew = detailDigital.map((item = {}) => {
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
                detailDigital: detailDigitalNew
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
      const repayload = yield (asyncPayload(yield put({
        type: 'createRequestParams',
        payload: {
          "head": {},
          "param": {
            email,
            ...payload
          },
          powerMsg: '发送提现确认邮件',
          power: [1]
        }
      })))
      if (repayload) {
        const res = getRes(yield call(GetUserInfo, {}))
        if (resOk(res)) {
          const result = _.get(res, 'data.enabledTwoFactories')
          if (result === true) {
            const res = getRes(yield call(SendEmailToWithdraw, repayload))
            if (resOk(res)) {
              const result = _.get(res, 'data')
              if (result === '') {
                return true
              }
            }
          } else if (result === false) {
            yield put({
              type: 'openModal',
              payload: {
                name: 'googleCodeOpen'
              }
            })
          }
        }
      }
    },

    // 数字货币提现申请
    * doWithdrawApply({ payload = {} }, { call, put, select }) {
      const repayload = yield (asyncPayload(yield put({
        type: 'createRequestParams',
        payload: {
          "head": {},
          "param": {
            ...payload
          },
          powerMsg: '获取资金记录',
          power: [1]
        }
      })))
      if (repayload) {
        const res = getRes(yield call(doWithdrawApply, repayload))
        if (resOk(res)) {
          const result = _.get(res, 'data')
          if (result === '') {
            yield put({
              type: 'changeState',
              payload: {
                withDrawPage: 1
              }
            })
            Toast.tip('提现申请成功')

          }

        }
      }
    },

    // 数字货币资金记录
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
          const { result = [], totalCount, pageSize } = _.get(res, 'data') || {}
          if (result) {
            yield put({
              type: 'changeState',
              payload: {
                record: result,
                recordTotalPage: Math.ceil(Number(totalCount) / Number(pageSize))
              }
            })
            return result
          }
        }
      }
    },

  },
  reducers: {},
})
