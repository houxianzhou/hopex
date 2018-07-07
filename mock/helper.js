import { _ } from 'lodash'

export default {
  random: _.random,
  randomArrayMap: (amount) => {
    return (new Array(amount)).fill({})
  },
  randomStr: (start = 100, end = 10000) => {
    return _.random(start, end) + ''
  },
  randomStr: (start = 100, end = 10000) => {
    return _.random(start, end) + ''
  },
}
