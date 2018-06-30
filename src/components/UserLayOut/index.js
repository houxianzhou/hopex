import React, { Component } from 'react'
import { connect } from 'dva'
import { Router, Route, Redirect, Switch } from 'dva/router'
import dynamic from 'dva/dynamic'
import User from '@routes/User'

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
      <div>
        <div>userLayout</div>
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
