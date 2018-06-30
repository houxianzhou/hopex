import React from 'react'
import { Helmet } from "react-helmet";
import { Router, Route, Switch } from 'dva/router'
import pathToRegexp from 'path-to-regexp'
import { BasicLayOut, UserLayOut } from '@components'
import { default as routes } from '@common/routes'

const getDynamicRoutes = (routes) => {
  return routes.map(item => {
    const { path, model: models, route: component } = item
    return {
      path,
      models: models && models.length ? () => models.map(model => import(`@models/${model}`)) : undefined,
      component: component ? () => import(`@routes/${component}`) : console.error('新增的路由必须有对应的组件')
    }
  })
}

const classifyRoutes = (routes) => {
  const [routesBasic, routesUser] = [[], []]
  routes.map(item => {
    if (pathToRegexp(`/user/(.*)?`).exec(item.path)) {
      routesUser.push(item)
    } else {
      routesBasic.push(item)
    }
  })
  return [routesBasic, routesUser]
}

export default ({ history, app }) => {
  routes[0].model.map(item => app.model(require(`@models/${item}`).default))
  routes.splice(0, 1)
  const [routesBasic, routesUser] = classifyRoutes(getDynamicRoutes(routes))
  const getProps = (props) => ({
    ...props,
    app,
    routesBasic,
    routesUser
  })
  return (
    <>
      <Router history={history}>
        <Switch>
          <Route path="/user/(.*)?" render={(props) => (<UserLayOut {...getProps(props)} />)}/>
          <Route path="/" render={(props) => (<BasicLayOut {...getProps(props)} />)}/>
        </Switch>
      </Router>
    </>
  )
}

