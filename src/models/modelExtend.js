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
      const { power = [] } = payload
      const needPower = power[0] === POWER.private
      const model = yield select(({ user, theme, home }) => (
        {
          ...user, ...theme,
          market: home.market
        }
      ))
      const { userInfo: { userId, userToken } = {}, version, lang, market } = model
      let result = Imu.fromJS(payload)
      const reset = resetIn(result)
      if (_.has(payload, 'head')) {
        result = reset(['head', 'timestamps'], String(Date.now()))
        result = reset(['head', 'version'], String(Date.now()))
        result = reset(['head', 'lang'], String(lang))
        result = reset(['head', 'request'], String("request"))
        result = reset(['head', 'packType'], String("1"))
        result = reset(['head', 'serialNumber'], String(_.uniqueId()))
        if (needPower) {
          result = reset(['head', 'userId'], String(userId))
          result = reset(['head', 'userToken'], String(userToken))
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
    },
    * getPropsParams({ payload = {} }, { call, put, select }) {
      // const model = yield select(({ home }) => (
      //   {
      //     numberToFixed: home.numberToFixed
      //   }
      // ))
      // const { numberToFixed } = model
      // return {
      //   numberToFixed
      // }
    }
  },

  reducers: {
    changeState(state, { payload }) {
      return { ...state, ...payload }
    },
  }
}
