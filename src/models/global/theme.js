import { joinModel } from '@utils'
import modelExtend from '@models/modelExtend'
import { _, getRes, resOk, asyncPayload, } from '@utils'
import { THEME, } from '@constants'
import {
  getNetWork
} from '@services/trade'

export default joinModel(modelExtend, {
  namespace: 'theme',
  state: {
    netWorkStatus: 2, // 2,非常好；1：缓慢；0：异常
    lang: "cn",
    version: "1.0.0",
    viewPosition: false,//最新成交列表和委托列表位置
    RG: 1,//红绿切换 1为正常的绿涨红跌，0为红涨绿跌
    theme: THEME.DEEPDARK,//THEME.LIGHT,
    dragIndex: [
      'LatestRecord'
    ],
    calculateTableHeight: (dataSource, HeadTr = 40, bodyTr = 40, expandHeadTr = 40, expandBodyTr = 40) => {
      return dataSource.reduce((sum, next = {}) => {
        const { expand = [] } = next
        return (expand.length ? expand.length * expandBodyTr + expandHeadTr : 0) + sum
      }, dataSource.length * bodyTr + HeadTr)
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {

    },
  },

  effects: {
    * getNetWork({ payload = {} }, { call, put, select }) {
      const start = (new Date()).getTime()
      const res = yield call(getNetWork, {})
      let netWorkStatus = 0
      if (res === 200) {
        const end = (new Date()).getTime()
        const diff = end - start
        if (diff < 1000) {
          netWorkStatus = 2
        } else {
          netWorkStatus = 1
        }
      } else {
        netWorkStatus = 0
      }
      yield put({
        type: 'changeState',
        payload: {
          netWorkStatus
        }
      })
    },
  },
  reducers: {},
})
