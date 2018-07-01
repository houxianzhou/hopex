import React, { Component } from 'react'
import { connect } from 'dva'
import { Route, Redirect, Switch } from 'dva/router'
import dynamic from 'dva/dynamic'

@connect(({ loading, dispatch }) => ({
  loading,
  dispatch,
}))
export default class View extends Component {
  render() {
    const {
      app, routesBasic
    } = this.props
    return (
      <div>
        <div style={{ background: 'red' }}>头部</div>
        <Switch>
          <Redirect exact from="/" to='/home'/>
          {
            routesBasic.map(({ path, ...dynamics }) => {
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
