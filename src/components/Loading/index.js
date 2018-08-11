import React, { Component } from 'react'
import * as styles from './index.less'
import { classNames } from '@utils'


// https://www.html5tricks.com/demo/svg-css3-loading-icons/index.html
class Circle1 extends Component {
  render() {
    let {
      size = 'middle',
      loading = false,
    } = this.props
    const { color = '#f3f3f3' } = this.props
    switch (size) {
      case 'large':
        size = 23
        break
      case 'middle':
        size = 20
        break
    }
    return (
      loading ? (
        <i style={{ fontSize: size,}}
           className={
             classNames(
               'iconfont icon-loading',
               styles.loadingIcon
             )
           } />
      ) : null

    )
  }
}


export default {
  Circle1
}


