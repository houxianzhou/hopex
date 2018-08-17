import React, { Component } from 'react'
import { connect } from 'dva'

@connect(({ theme: model, loading, dispatch }) => ({
  model,
  modelName: 'theme',
  loading,
  dispatch,
}))
export default class View extends Component {
  render() {
    const { history, value, children } = this.props
    return (
      <span onClick={() => {
        history.replace({
          search: `?marketCode=${value}`,
        })
      }} >{children}</span >
    )
  }
}


