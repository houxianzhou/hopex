import { joinModel } from '@utils'
import modelExtend from '@models/modelExtend'
import { THEME } from '@constants'

export default joinModel(modelExtend, {
  namespace: 'theme',
  state: {
    lang: "cn",
    version: "1.0.0",
    viewPosition: false,//最新成交列表和委托列表位置
    RG: 1,//红绿切换 1为正常的绿涨红跌，0为红涨绿跌
    theme: THEME.LIGHT,
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

  effects: {},
  reducers: {},
})
