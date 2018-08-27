import { routerRedux } from 'dva/router'
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
      const ifNeedPower = power[0] === POWER.ifPrivate //如果登陆了就发，不一定是必须
      const model = yield select(({ user, theme, home }) => (
        {
          ...user, ...theme,
          marketCode: home.marketCode
        }
      ))
      const { userInfo, userInfo: { userId, userToken } = {}, version, lang, marketCode } = model
      delete payload.power
      delete payload.powerMsg
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
          result = reset(['head', 'msgType'], String("request"))
          result = reset(['head', 'packType'], String("1"))
          result = reset(['head', 'serialNumber'], String(_.uniqueId()))
          if (needPower || ifNeedPower) {
            result = reset(['head', 'userId'], userId ? String(userId) : undefined)
            result = reset(['head', 'userToken'], userToken ? String(userToken) : undefined)
          }
        }
        if (_.has(payload, 'param')) {
          result = reset(['param', 'market'], String(marketCode))
          result = reset(['param', 'marketCode'], String(marketCode))
          result = reset(['param', 'contractCode'], String(marketCode))
          result = reset(['param', 'lang'], String(lang))
        }
        // 单独的一套规则
        if (_.has(payload, 'param1')) {
          result = reset(['param1', 'market'], String(marketCode))
          result = reset(['param1', 'lang'], String(lang))
        }

        result = result.map((value) => {
          if (value === 'replaceWith_market') return String(marketCode)
          return value
        })

        return result.toJS()
      }
    },
    * getPropsParams({ payload = {} }, { call, put, select }) {
      // 未启用
    },
    * openModal({ payload = {} }, { call, put, select }) {
      const { name, data } = payload
      yield put({
        type: 'modal/changeState',
        payload: {
          name,
          data,
          state: true
        }
      })
    },
    * closeModal({ payload = {} }, { call, put, select }) {
      yield put({
        type: 'modal/changeState',
        payload: {
          name: '',
          data: null,
          state: false
        }
      })
    },
    * routerGo({ payload = {} }, { call, put, select }) {
      if (payload === -1) {
        yield put(routerRedux.go(payload))
      } else {
        let repayload
        if (_.isObjectLike(payload)) {
          repayload = payload
        } else {
          repayload = {
            pathname: payload
          }
        }
        yield put(routerRedux.push(repayload))
      }
    }
  },

  reducers: {
    changeState(state, { payload = {} }) {
      return { ...state, ...payload }
    },
    clearState(state, { payload }) {
      return {}
    },
  }
}
