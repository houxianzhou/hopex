import React, { Component } from 'react'
import { connect } from 'dva'
import { Route, Redirect, } from 'dva/router'
import { _, } from '@utils'
import { Toast } from '@components'
import { PATH } from "@constants"

@connect(({ user, dispatch }) => ({
  model: user,
  dispatch,
}))
class Router extends Component {
  render() {
    const { location: { pathname } = {} } = this.props
    const {
      model: { userInfo = {} } = {}, component: Component, authority = [], noMatch = () => {
        return <Redirect
          to={{
            pathname: PATH.login,
            state: { redirect: pathname }
          }}
        />
      }, ...rest
    } = this.props
    const isLogin = !_.isEmpty(userInfo)
    let isAuthenticated = true
    switch (authority[0]) {
      case 1: {//1 代表该权限需要登录,未登录就默认重定向
        if (!isLogin) {
          Toast.tip('账户过期，请重新登录')
          isAuthenticated = false
        }
      }
        break
      default:
    }
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            <Component {...props} />
          ) : (
            noMatch()
          )
        }
      />
    )
  }
}


export default {
  Router,
}


