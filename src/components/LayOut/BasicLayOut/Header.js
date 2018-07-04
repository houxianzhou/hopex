import React, { Component } from 'react'
// import { connect } from 'dva'
import { NavLink } from 'dva/router'
import { classNames, switchTheme } from '@utils'
import logo from '@assets/logo.png'
import * as styles from './index.less'

// @connect(() => ())
export default class View extends Component {
  render() {
    const { model: { theme }, routesBasic } = this.props
    // console.log(routesBasic)
    return (
      <div className={
        classNames(
          styles.header,
          switchTheme(theme) ? styles.dark : styles.light
        )
      } >
        <img alt='logo' src={logo} />
        <ul className={styles.nav} >
          {
            routesBasic.map(item => {
              return (
                <li key={item.name} >
                  {item.name}
                  {/*<NavLink to={item.path} >*/}
                    {/*{item.name}*/}
                  {/*</NavLink >*/}
                </li >
              )
            })
          }
        </ul >
      </div >
    )
  }
}
