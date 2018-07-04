import React, { Component } from 'react'
import { connect } from 'dva'
import { Route, Redirect, Switch } from 'dva/router'
import dynamic from 'dva/dynamic'
import { classNames, switchTheme } from '@utils'
import { Scroller, Responsive } from '@components'
import Header from './Header'
import Content from './Content'
import * as styles from './index.less'

@connect(({ theme, loading, dispatch }) => ({
  loading,
  dispatch,
  model: theme
}))
export default class View extends Component {
  render() {
    const {
      app, routesBasic, model: { theme }
    } = this.props
    return (
      <Responsive common_cN="device" >
        <div className={
          classNames(
            styles.overbody,
            switchTheme(theme) ? styles.dark : null
          )
        } >
            <Header {...this.props} />
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
        </div >
      </Responsive >
    )
  }
}
