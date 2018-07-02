import React, { Component } from 'react'
import { connect } from 'dva'
import { Mixin } from '@components'
import ScrollPannel from './components/ScrollPanel'
import styles from './index.less'

// @connect(({ home: model, user, loading, dispatch }) => ({
//   user,
//   model
// }))
export default class View extends Component {
  componentDidMount() {
    console.log('task1子组件')
  }

  render() {
    return (
      <div style={{
        width: 300,
        height: 200
      }} >
        <ScrollPannel >
          <div style={{ height: 300 }} >ddd</div >

        </ScrollPannel >
      </div >
    )
  }
}

