import React, { Component } from 'react'
import { connect } from 'dva'
import { Mixin } from '@components'
import Task1 from './task1'
import styles from './index.less'


// @connect(({ home: model, user, loading, dispatch }) => ({
//   user,
//   model
// }))
export default class View extends Component {
  startInit() {
    console.log('父组件')
  }

  render() {
    return (
      <Mixin {...{ that: this }}>
        <div >home页面1</div >
        <Task1 ></Task1 >
      </Mixin >
    )
  }
}

