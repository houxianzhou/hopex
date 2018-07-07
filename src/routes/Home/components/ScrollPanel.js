import React, { Component } from 'react'
import { Scroller } from '@components'
import { classNames } from '@utils'
import * as styles from './ScrollPanel.less'

export default class View extends Component {

  render() {
    const { header, theader, scroller = true, children, className = {}, style = {}, scrollConfig = {} } = this.props

    return (
      <div className={
        classNames(
          styles.scrollpannel,
          className
        )
      } style={style} >
        {
          header ? (<div className={styles.header} style={{ height: 40 }} >{header}</div >) : null
        }
        {
          theader ? (<div className={styles.theader} style={{ height: 32 }} >{theader}</div >) : null
        }
        {
          scroller ? (
            <Scroller scrollbar='fixed' {...scrollConfig}  >
              {children}
            </Scroller >
          ) : <>{children}</>
        }
      </div >
    )
  }

}
