import { modelName } from '@constants'
import _ from 'lodash'

export const getModelName = (name) => modelName[name]

export const lodash_helper={
  has:_.has
}
