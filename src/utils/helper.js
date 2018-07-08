import _ from 'lodash'
import store from 'store'

export const lodash_helper = {
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
  remove: store.remove,
  clearAll: store.clearAll
}


