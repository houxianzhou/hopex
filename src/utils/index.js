import qs from 'qs'
import { BigNumber } from 'bignumber.js'
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
  if (res) {
    return {
      head: _.get(res, 'data.head') || _.get(res, 'head') || {},
      data: _.has(res, 'data.data.data') ? _.get(res, 'data.data.data') : (_.has(res, 'data.data') ? _.get(res, 'data.data') : (_.has(res, 'data') ? _.get(res, 'data') : res))
    }
  }
  return {
    data: null,
    head: null,
    code: (res && res.errcode) || '',
    msg: _.get(res, 'data.errormsg') || _.get(res, 'errStr')
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
export const delay = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}


export const Patterns = {
  number: /^[0-9]*$/,
  decimalNumber: /^[0-9]+([.|。]{1}[0-9]*){0,1}$/,
  decimalNumber4: /^[0-9]+([.|。]{1}[0-9]{0,4}){0,1}?$/,
  email: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/
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


const toFixed = (item = 0, tofixed, toformat) => {
  if (!tofixed && !toformat) {
    return _.toNumber(Number(item))
  } else {
    if (tofixed && toformat) {
      return (new BigNumber(Number(item))).toFormat(tofixed)
    } else if (!tofixed && toformat) {
      return Number(item).toLocaleString()
    }
    return (new BigNumber(Number(item))).toFixed(tofixed)
  }
}
// console.log((new BigNumber(1000)).toFormat(2))
// console.log((new BigNumber((new BigNumber(1000)).toFixed(5))).toFormat(5))
//console.log((new BigNumber((new BigNumber(1000)).toFormat(2))).toFixed(5))


export const formatNumber = (...params) => {
  const [prev, propertys = [], tofixed, toformat] = params
  const obj = deepClone(prev)
  if (_.isNaN(prev)) return ''
  if (_.isObjectLike(obj)) {
    if (!_.isArray(propertys) && propertys.length) return obj
    if (_.isArray(obj)) {
      return _.map(obj, (item) => {
        if (_.isPlainObject(item)) {
          for (let i = 0; i < propertys.length; i++) {
            const key = propertys[i]
            const value = _.get(item, [propertys[i]])
            if (_.has(item, key)) {
              _.set(item, [key], toFixed(value, tofixed, toformat))
            }
          }
          return item
        }
        return item
      })
    }
  } else if (_.isNumber(obj) || _.isString(obj)) {
    let param1 = params[1]
    let param2 = params[2]
    if (param1 === 'p' || param1 === 'price') param1 = 4
    return toFixed(obj, param1, param2)
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

export const clearIntervals = (params) => {
  if (params) {
    if (_.isArray(params)) {
      params.forEach(item => item && clearTimeout(item))
    } else {
      clearTimeout(params)
    }
  }
}

export const SetFullScreen = (Ele) => {
  if (document.documentElement.requestFullscreen) {
    Ele.requestFullscreen()
  } else if (document.documentElement.mozRequestFullScreen) {
    Ele.mozRequestFullScreen()
  } else if (document.documentElement.webkitRequestFullscreen) {
    Ele.webkitRequestFullscreen()
  }
}






