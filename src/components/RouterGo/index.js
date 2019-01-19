import React, { Component } from 'react'
import { connect } from 'dva'
import { PATH } from '@constants'
import * as styles from './index.less'

@connect(({ theme: model, loading, dispatch, }) => ({
  model,
  modelName: 'theme',
  loading,
  dispatch,
}))
class SwitchRoute extends Component {
  render() {
    const { children, Ele = 'span', dispatch, modelName, value } = this.props
    return (
      <Ele
        style={{ cursor: 'pointer' }}
        onClick={() => {
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
        payload: {
          pathname: PATH.home,
          search: `?marketCode=${value}`
        }
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
        }} className={styles.gowhere} >{value}</span >
      ) : <Ele onClick={() => {
        switchMarket(value) //此时value就是marketCode
      }} className={styles.gowhere} >{children}</Ele >
    )
  }
}

export default {
  SwitchRoute,
  SwitchMarket
}


