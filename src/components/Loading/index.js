import React, { Component } from 'react'
import ReactLoading from 'react-loading'
import * as styles from './index.less'
import { classNames } from '@utils'


// https://www.html5tricks.com/demo/svg-css3-loading-icons/index.html
class Circle extends Component {
  render() {

    const { color = '#f3f3f3', isGlobal = false, margin = '0 10px' } = this.props
    let {
      size = isGlobal ? 40 : 'middle',
      loading = false,
    } = this.props
    switch (size) {
      case 'large':
        size = 23
        break
      case 'middle':
        size = 20
        break
    }

    let v = (
      <i style={{ fontSize: size, color: color, margin: margin }}
         className={
           classNames(
             'iconfont icon-loading',
             styles.loadingIcon
           )
         } />
    )
    return (
      loading ? (
        isGlobal ? (
          <div className={styles.loadingContainer} >
            {v}
          </div >
        ) : v
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
        <div className={styles.loadingContainer} >
          <ReactLoading type='bars' color={color} />
        </div >
      ) : null
    )
  }
}


export default {
  Circle,
  Bars
}


