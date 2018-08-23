import React, { Component } from 'react'
import { PATH } from '@constants'

// @connect(({ theme: model, loading, dispatch }) => ({
//   model,
//   modelName: 'theme',
//   loading,
//   dispatch,
// }))
export default class View extends Component {
  go = (marketCode) => {
    const { history } = this.props
    history.replace({
      search: `?marketCode=${marketCode}`,
    })
  }
  switchMarket = (value) => {
    const { history, location: { pathname }, dispatch, modelName } = this.props
    if (pathname !== PATH.home) {
      dispatch({
        type: `${modelName}/routerGo`,
        payload: PATH.home
      })
    } else {
      history.replace({
        search: `?marketCode=${value}`,
      })
    }
  }

  render() {
    const { go, switchMarket } = this
    const { value, marketCode, children, Ele = 'span' } = this.props
    return (
      value && marketCode ? (
        <span onClick={() => {
          go(marketCode)
        }} >{value}</span >
      ) : <Ele onClick={() => {
        switchMarket(value)
      }} >{children}</Ele >
    )
  }
}


