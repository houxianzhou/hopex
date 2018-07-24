import React, { Component } from 'react'
import { connect } from 'dva'
import { Route,  Switch } from 'dva/router'
import dynamic from 'dva/dynamic'
import * as styles from './index.less'

@connect(({ loading, dispatch }) => ({
  loading,
  dispatch,
}))
export default class View extends Component {
  render() {
    const {
      app, routesUser,
    } = this.props
    return (
      <div className={styles.overbody}>
        <Switch>
          {
            routesUser.map(({ path, ...dynamics }) => {
              return (
                <Route key={path} path={path} exact component={dynamic({
                  app,
                  ...dynamics
                })}/>
              )
            })
          }
        </Switch>
      </div>
    )
  }
}
