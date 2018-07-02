import React, { Component } from 'react'
import { connect } from 'dva'
import Responsive from '@components/Responsive'
import { classNames, switchTheme } from '@utils'
import logo from '@assets/logo.png'
import * as styles from './index.less'


// @connect(() => ())
export default class View extends Component {
  render() {
    console.log(this.props)
    const { model: { theme }, routesBasic } = this.props
    return (
      <div >
        <Responsive >
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
                    <li key={item.name} className={styles.active} >
                      {item.name}
                    </li >
                  )
                })
              }
            </ul >
          </div >

        </Responsive >
      </div >
    )
  }
}
