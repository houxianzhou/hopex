import { SPEED } from '@constants'
import { lodash_helper, immutable } from './helper'

export { default as joinModel }  from 'dva-model-extend'
export Responsive from 'react-responsive'
export classNames from 'classnames'
export { request } from './request'
export const _ = lodash_helper
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
  if (_.isNull(res.data) || _.isUndefined(res.data)) {
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

export const getPercent = (child, parent, item) => {
  if (parent) {
    return child / parent * 100 + '%'
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
  const { fromJS } = Imu
  return fromJS(obj).toJS()
}

export const asyncPayload = (payload, func) => {
  if (payload.then) {
    return payload.then((res) => {
      return func(res)
    })
  } else {
    return func(payload)
  }
}


const toFixed = (item = 0, tofixed = 0) => {
  return _.toNumber(Number(item).toFixed(tofixed))
}

export const formatNumber = (obj1, propertys = [], tofixed = 2) => {
  if (!_.isArray(propertys) && propertys.length) return obj1
  const obj = deepClone(obj1)
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
  return obj1
}






