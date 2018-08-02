import { _ } from 'lodash'
import moment from 'moment'

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
  getdays: (startTime, endTime, isInclude = false) => {
    const days = Math.ceil(moment.duration(endTime - startTime).asDays())
    const daysArray = []
    for (let i = 0; i < days - 2; i++) {
      daysArray.push(startTime + (i + 1) * 1 * 24 * 60 * 60 * 1000)
    }
    return daysArray
  }
}
