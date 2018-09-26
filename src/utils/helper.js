import _ from 'lodash'
import moment from 'moment'
import store from 'store'
import { fromJS, is } from 'immutable'

export const lodash_helper = {
  invert: _.invert,
  findIndex: _.findIndex,
  isInteger: _.isInteger,
  groupBy: _.groupBy,
  inRange: _.inRange,
  clamp: _.clamp,
  min: _.min,
  max: _.max,
  remove: _.remove,
  sumBy: _.sumBy,
  mapKeys: _.mapKeys,
  toPairs: _.toPairs,
  isEqual: _.isEqual,
  toNumber: _.toNumber,
  isPlainObject: _.isPlainObject,
  map: _.map,
  orderBy: _.orderBy,
  debounce: _.debounce,
  maxBy: _.maxBy,
  isArray: _.isArray,
  merge: _.merge,
  isObject: _.isObject,
  isObjectLike: _.isObjectLike,
  keys: _.keys,
  values: _.values,
  throttle: _.throttle,
  random: _.random,
  has: _.has,
  get: _.get,
  set: _.set,
  isNil: _.isNil,
  isEmpty: _.isEmpty,
  isNull: _.isNull,
  isNaN: _.isNaN,
  isUndefined: _.isUndefined,
  isBoolean: _.isBoolean,
  isNumber: _.isNumber,
  isString: _.isString,
  cloneDeep: _.cloneDeep,
  uniqueId: _.uniqueId,
  isFunction: _.isFunction
}

export const localSave = {
  get: (key) => {
    return store.get(key)
  },
  set: (key, value) => {
    store.set(key, value)
  },
  remove: (key) => {
    store.remove(key)
  },
  clearAll: () => {
    store.clearAll()
  },
  getUserInfo: () => {
    return store.get('userInfo')
  }
}

export const immutable = {
  fromJS,
  is
}

export const moment_helper = {
  format: (time = Date.now(), format = 'YYYY-MM-DD') => {
    return moment(time).format(format)
  },
  formatHMS: (time = Date.now()) => {
    return moment(time).format('HH:mm:ss')
  },
  formatHMSFromSeconds: (time) => {
    return moment_helper.formatHMS(String(time).split('.')[0] * 1000)
  },
  getdays: (startTime, endTime, isInclude = false) => {
    const days = Math.ceil(moment.duration(endTime - startTime).asDays())
    const daysArray = []
    for (let i = 0; i < days - 2; i++) {
      daysArray.push(startTime + (i + 1) * 1 * 24 * 60 * 60 * 1000)
    }
    return daysArray
  }
}


