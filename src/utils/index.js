import qs from 'qs'
import { SPEED } from '@constants'
import { lodash_helper, immutable, moment_helper } from './helper'

export { default as joinModel }  from 'dva-model-extend'
export Responsive from 'react-responsive'
export classNames from 'classnames'
export { request } from './request'
export const _ = lodash_helper
export const moment = moment_helper
export { localSave } from "./helper"
export const Imu = immutable

export const getRes = function (res) {
  if (res && res.data && res.data.data) {
    return {
      head: _.get(res, 'data.head'),
      data: _.get(res, 'data.data')
    }
  }
  if (res && res.data && !res.data.data && !res.data.head) {
    return {
      data: _.get(res, 'data')
    }
  }
  if (res && res.data && !res.data.data) {
    return {
      head: _.get(res, 'data.head'),
      data: _.get(res, 'data.data')
    }
  }
  return {
    data: null,
    head: null,
    code: (res && res.errcode) || '',
    msg: res && res.data && res.data.errormsg
  }
}

export const resOk = (res, method) => {
  if (_.isNil(res.data)) {
    return false
  }
  // if (method && res.head.method !== method) {
  //   return false
  // }
  return true
}

export const switchTheme = (theme) => {
  return theme === 'dark'
}

export const dealInterval = (func, interval = SPEED.DOWM) => {
  return setTimeout(func, interval)
}

export const Patterns = {
  number: /^[0-9]*$/,
  decimalNumber: /^[0-9|\.]*$/
}

export const getPercent = (child = 1, parent = 1, min = 0) => {
  if (parent) {
    let value = child / parent
    value = value > min ? value : min
    return value * 100 + '%'
  }
}

export const isEqual = (obj1, obj2) => {
  if (_.isObjectLike(obj1) || _.isObjectLike(obj2)) {
    const { fromJS, is } = Imu
    return is(fromJS(obj1), fromJS(obj2))
  } else {
    return _.isEqual(obj1, obj2)
  }
}

export const deepClone = (obj) => {
  if (_.isObjectLike(obj)) {
    const { fromJS } = Imu
    return fromJS(obj).toJS()
  } else {
    return obj
  }
}

export const asyncPayload = async (payload, func) => {
  let res
  if (payload.then) {
    res = await payload.then(res => res)
  }
  return func ? func(res) : res
}


const toFixed = (item = 0, tofixed = 0) => {
  return _.toNumber(Number(item).toFixed(tofixed))
}

export const formatNumber = (...params) => {
  const [prev, propertys = [], tofixed = 2] = params
  const obj = deepClone(prev)
  if (_.isObjectLike(obj)) {
    if (!_.isArray(propertys) && propertys.length) return obj
    if (_.isArray(obj)) {
      return _.map(obj, (item) => {
        if (_.isPlainObject(item)) {
          for (let i = 0; i < propertys.length; i++) {
            const key = propertys[i]
            const value = _.get(item, [propertys[i]])
            if (_.has(item, key)) {
              _.set(item, [key], toFixed(value, tofixed))
            }
          }
          return item
        }
        return item
      })
    }
  } else if (_.isNumber(obj) || _.isString(obj)) {
    const param = params[1] || tofixed
    return toFixed(obj, param)
  } else {
    return obj
  }
}

export const formatJson = (string) => {
  if (_.isObjectLike(string)) return string
  return JSON.parse(string.replace(/\s+/g, ''))
}

// export const hasPower = (obj = {}) => {
//   if (_.get(obj, 'userId') && _.get(obj, 'userToken')) {
//     return true
//   }
//   console.log('无法获取到userId,userToken，无权限调用接口')
//   return false
// }

export const parsePathSearch = (search = '') => {
  return qs.parse(search, { ignoreQueryPrefix: true })
}






