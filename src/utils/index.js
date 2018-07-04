import { SPEED } from '@constants'
import { lodash_helper } from './helper'

export { default as joinModel }  from 'dva-model-extend'
export Responsive from 'react-responsive'
export classNames from 'classnames'
export { request } from './request'
export const _ = lodash_helper


export const getRes = function (res) {
  if (res && res.data && res.data.data) {
    return res.data.data
  }
  if (res && res.data && !res.data.data) {
    return res.data
  }
  if (res && !res.data) {
    return res
  }
  return {
    data: null,
    code: (res && res.errcode) || '',
    msg: res && res.data && res.data.errormsg
  }
}

export const resOk = (res) => {
  if (_.isNull(res.data)) {
    return false
  }
  return true
}

export const switchTheme = (theme) => {
  return theme === 'dark'
}

export const dealInterval = (func, interval = SPEED.DOWM) => {
  return setTimeout(func, interval)
}



