import React, { Component } from 'react'
import { Scroller } from '@components'
import { classNames } from '@utils'
import * as styles from './ScrollPanel2.less'

export default class View extends Component {

  render() {
    const { header, children, className = {}, style = {} } = this.props

    return (
      <div className={
        classNames(
          styles.scrollPannel,
          className
        )
      } style={style} >
        {
          header ? (<div className={styles.header} >{header}</div >) : null
        }
        <div className={styles.scrollPannelContainer} >
          <div className={styles.scrollPannelContent} >
            {children}
          </div >
        </div >
      </div >
    )
  }
}
