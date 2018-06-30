import React, { Component } from 'react'
import { connect } from 'dva'
// import styles from './index.less'

@connect(({ home: model, user, loading, dispatch }) => ({
  user,
  model
}))
export default class View extends Component {
  render() {
    console.log(this.props)
    return (
     <div>用户自定义</div>
    )
  }
}

