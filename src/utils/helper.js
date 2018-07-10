import _ from 'lodash'
import store from 'store'
import { fromJS, is } from 'immutable'

export const lodash_helper = {
  debounce: _.debounce,
  maxBy: _.maxBy,
  isArray: _.isArray,
  isObjectLike: _.isObjectLike,
  keys: _.keys,
  throttle: _.throttle,
  random: _.random,
  has: _.has,
  get: _.get,
  isEmpty: _.isEmpty,
  isNull: _.isNull,
  isUndefined: _.isUndefined,
  isBoolean: _.isBoolean,
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
  is,
}


