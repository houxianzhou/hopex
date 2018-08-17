import React, { Component } from 'react'
import { connect } from 'dva'
import { Route, Redirect, Switch } from 'dva/router'
import dynamic from 'dva/dynamic'
import { classNames, switchTheme } from '@utils'
import { Scroller, Responsive } from '@components'
import { PATH } from '@constants'
import Header from './Header'
import Content from './Content'
import Footer from './Footer'
import * as styles from './index.less'

@connect(({ theme, loading, dispatch }) => ({
  // theme,
  loading,
  dispatch,
  modelName: 'theme'
}))
export default class View extends Component {
  switchMarket = (value, marketCode) => {
    const { history, location: { pathname }, dispatch, modelName } = this.props
    const go = (marketCode) => {
      history.replace({
        search: `?marketCode=${marketCode}`,
      })
    }
    if (value && marketCode) {
      return (
        <span onClick={() => {
          go(marketCode)
        }} >{value}</span >
      )
    } else if (value) {
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
  }

  render() {
    const { switchMarket } = this
    const {
      app, routesBasic
    } = this.props
    return (
      <Responsive common_cN="device" >
        <div className={
          classNames(
            styles.overbody,
            styles.dark,
            //switchTheme(theme) ? styles.dark : null
          )
        } >
          <Header {...this.props} switchMarket={switchMarket} />
          <Content >
            <Switch >
              <Redirect exact from="/" to='/home' />
              {
                routesBasic.map(({ path, ...dynamics }) => {
                  return (
                    <Route key={path} path={path} exact component={dynamic({
                      app,
                      ...dynamics
                    })} />
                  )
                })
              }
            </Switch >
          </Content >
          <Footer {...this.props} switchMarket={switchMarket} />
        </div >
      </Responsive >
    )
  }
}
