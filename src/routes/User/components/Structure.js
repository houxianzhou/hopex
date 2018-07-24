import React, { Component } from 'react'
import { classNames } from '@utils'
import * as styles from './Structure.less'


export default class View extends Component {
  render() {
    const { children, } = this.props
    return (
      <div className={styles.structure} >
        <div className={styles.content} >
          <div className={styles.back} >返回</div >
          {children}
        </div >
      </div >
    )
  }
}
