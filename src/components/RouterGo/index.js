import React, { Component } from 'react'
import { connect } from 'dva'
import { PATH } from '@constants'

@connect(({ theme: model, loading, dispatch,}) => ({
  model,
  modelName: 'theme',
  loading,
  dispatch,
}))
class SwitchRoute extends Component {
  render() {
    const { children, Ele = 'span', dispatch, modelName, value } = this.props
    return (
      <Ele onClick={() => {
        dispatch(
          {
            type: `${modelName}/routerGo`,
            payload: value
          }
        )
      }} >{children}</Ele >
    )
  }
}


class SwitchMarket extends Component {
  go = (marketCode) => {
    const { history } = this.props
    history.replace({
      search: `?marketCode=${marketCode}`,
    })
  }
  switchMarket = (value) => {
    const { location: { pathname }, dispatch, modelName } = this.props
    if (pathname !== PATH.home) {
      dispatch({
        type: `${modelName}/routerGo`,
        payload: PATH.home
      })
    } else {
      this.go(value)
    }
  }

  render() {
    const { switchMarket } = this
    const { value, marketCode, children, Ele = 'span' } = this.props
    return (
      value && marketCode ? (
        <span onClick={() => {
          switchMarket(marketCode)
        }} >{value}</span >
      ) : <Ele onClick={() => {
        switchMarket(value) //此时value就是marketCode
      }} >{children}</Ele >
    )
  }
}

export default {
  SwitchRoute,
  SwitchMarket
}


