import React, { Component } from 'react'
import { connect } from 'dva'
import { Mixin } from '@components'
import styles from './index.less'

// @connect(({ home: model, user, loading, dispatch }) => ({
//   user,
//   model
// }))
export default class View extends Component {
  componentDidMount(){
    console.log('task1子组件')
  }

  render() {
    return (
      <div>task1</div>
    )
  }
}

