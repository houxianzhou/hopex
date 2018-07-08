import { fromJS, is } from 'immutable'
import { SPEED } from '@constants'
import { lodash_helper } from './helper'


export { default as joinModel }  from 'dva-model-extend'
export Responsive from 'react-responsive'
export classNames from 'classnames'
export { request } from './request'
export const _ = lodash_helper
export { localSave } from "./helper";


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
  number: /^[0-9]*$/
}

export const getPercent = (child, parent, item) => {
  if (parent) {
    return child / parent * 100 + '%'
  }
}

export const isEqual = (obj1, obj2) => {
  return is(fromJS(obj1), fromJS(obj2))
}



