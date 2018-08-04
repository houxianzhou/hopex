import React, { Component } from 'react'
import { Scroller } from '@components'
import { classNames } from '@utils'
import * as styles from './ScrollPanel.less'

export default class View extends Component {

  render() {
    const { header, children, className = {}, style = {}, tableHeight = 'auto' } = this.props

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
        <div className={styles.scrollPannelContainer} style={{ height: tableHeight }} >
          <div className={styles.scrollPannelContent} >
            {children}
          </div >
        </div >
      </div >
    )
  }
}
