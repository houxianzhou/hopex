import { Imu, _ } from '@utils'
import { POWER } from "@constants"

const resetIn = (imuObj) => {
  return (propertys = [], value) => {
    if (imuObj.hasIn(propertys)) return imuObj
    imuObj = imuObj.setIn(propertys, value)
    return imuObj
  }
}

export default {
  effects: {
    * createRequestParams({ payload = {} }, { call, put, select }) {
      const { power = [], powerMsg = '' } = payload
      const needPower = power[0] === POWER.private
      const model = yield select(({ user, theme, home }) => (
        {
          ...user, ...theme,
          market: home.market
        }
      ))
      const { userInfo, userInfo: { userId, userToken } = {}, version, lang, market } = model
      delete payload.power
      let result = Imu.fromJS(payload)
      const reset = resetIn(result)
      if (needPower && _.isEmpty(userInfo)) {
        console.log(`${powerMsg} | 无法获取到userId,userToken，无权限调用接口`)
        return false
      } else {
        if (_.has(payload, 'head')) {
          result = reset(['head', 'timestamps'], String(Date.now()))
          result = reset(['head', 'version'], String('1.0'))
          result = reset(['head', 'lang'], String(lang))
          result = reset(['head', 'request'], String("request"))
          result = reset(['head', 'packType'], String("1"))
          result = reset(['head', 'serialNumber'], String(_.uniqueId()))
          if (needPower) {
            result = reset(['head', 'userId'], userId)
            result = reset(['head', 'userToken'], userToken)
          }
        }
        if (_.has(payload, 'param')) {
          result = reset(['param', 'market'], String(market))
        }
        result = result.map((value) => {
          if (value === 'replaceWith_market') return String(market)
          return value
        })
        return result.toJS()
      }
    },
    * getPropsParams({ payload = {} }, { call, put, select }) {
      // 未启用
    }
  },

  reducers: {
    changeState(state, { payload }) {
      return { ...state, ...payload }
    },
    // 改变合同的操作
    changeContractState(state, { payload }) {
      const name = payload
      const filterOne = state.marketList.filter(item => item.name === payload)[0] || {}
      const map = {
        market: filterOne.name
      }
      return {
        ...state,
        ...map
      }
    }
  }
}
