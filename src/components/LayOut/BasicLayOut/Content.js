import React, { Component } from 'react'
import * as styles from './index.less'

export default class Content extends Component {
  render() {
    const { children } = this.props
    return (
      <div className={styles.content} style={{
        // background:'red'
      }}>
        {children}
      </div >
    )
  }
}
