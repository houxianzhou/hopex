import React, { Component } from 'react'
import { connect } from 'dva'
import { _, } from '@utils'
import * as styles from './index.less'

@connect(({ dashboard: model }) => ({
  model,
}))
export default class View extends Component {
  render() {
    const { model: { myname } = {} } = this.props
    return (
      <div >home{myname}</div >
    )
  }
}
