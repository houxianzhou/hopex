import React, { Component } from 'react'
import { connect } from 'dva'
import { classNames } from '@utils'

@connect(({ user, dispatch }) => ({
  user,
  dispatch,
}))
class Route extends Component {
  render() {
    const { user: { userInfo = {} } = {} } = this.props
    return (
      <div >hahaah</div >
    )
  }
}


export default {
  Route,
}


