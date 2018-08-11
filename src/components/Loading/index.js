import React, { Component } from 'react'
import ReactLoading from 'react-loading'
import * as styles from './index.less'
import { classNames } from '@utils'


// https://www.html5tricks.com/demo/svg-css3-loading-icons/index.html
class Circle extends Component {
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
        <i style={{ fontSize: size, }}
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


class Bars extends Component {
  render() {
    let {
      loading = true,
    } = this.props
    const { color = '#fff' } = this.props
    return (
      loading ? (
        <div className={styles.loadingContainer}>
          <ReactLoading type='bars' color={color}  />
        </div>
      ) : null
    )
  }
}


export default {
  Circle,
  Bars
}


