import React, { Component } from 'react'
import { connect } from 'dva'
import { classNames, switchTheme } from '@utils'
import logo from '@assets/logo.png'
import * as styles from './index.less'


// @connect(() => ())
export default class View extends Component {
  render() {
    const { model: { theme }, routesBasic } = this.props
    return (
          <div className={
            classNames(
              styles.header,
              switchTheme(theme) ? styles.dark : styles.light
            )
          } >
            <img src={logo} />
            <ul className={styles.nav} >
              {
                routesBasic.map(item => {
                  return (
                    <li key={item.name} >
                      {item.name}
                    </li >
                  )
                })
              }
            </ul >
          </div >
    )
  }
}
