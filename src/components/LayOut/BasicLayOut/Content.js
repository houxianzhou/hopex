import React, { Component } from 'react'
import { connect } from 'dva'
import { classNames } from '@utils'
import * as styles from './index.less'


@connect(({ theme }) => ({
  theme
}))
export default class Content extends Component {
  render() {
    const { theme: { theme } } = this.props
    const { children } = this.props
    return (
      <div className={
        classNames(
          styles.content,
          theme
        )
      } >
        {children}
      </div >
    )
  }
}
