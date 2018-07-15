import _ from 'lodash'
import moment from 'moment'
import store from 'store'
import { fromJS, is } from 'immutable'

export const lodash_helper = {
  isEqual: _.isEqual,
  toNumber: _.toNumber,
  isPlainObject: _.isPlainObject,
  map: _.map,
  orderBy: _.orderBy,
  debounce: _.debounce,
  maxBy: _.maxBy,
  isArray: _.isArray,
  isObjectLike: _.isObjectLike,
  keys: _.keys,
  throttle: _.throttle,
  random: _.random,
  has: _.has,
  get: _.get,
  set: _.set,
  isEmpty: _.isEmpty,
  isNull: _.isNull,
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
    return moment(time).format('h:mm:ss')
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


