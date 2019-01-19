import React, { Component } from 'react'
import { _ } from '@utils'
import * as styles from './index.less'

export default class View extends Component {

  state = {
    startNum: null
  }

  componentDidMount() {
    const { auto = true, action = true } = this.props
    this.startUp(auto, action)
  }

  componentWillUnmount() {
    clearTimeout(this.interval)
  }

  countDown = () => {
    if (!this.state.startNum) {
      const { startNum = 60 } = this.props
      this.setState({
        startNum
      })
    }
    this.interval = setTimeout(() => {
      const next = this.state.startNum - 1
      this.setState({
        startNum: next
      })
      if (!next) {
        clearTimeout(this.interval)
      } else {
        this.countDown()
      }
    }, 1000)
  }

  startUp = (auto = true, action = true) => {
    const { onClick } = this.props
    if (auto) {
      if (_.isFunction(onClick) && action) onClick()
      this.countDown()
    }
  }

  render() {
    const { startNum } = this.state
    const { beginText = '点击发送', endText = '重新发送', style = {}, className } = this.props
    return (
      <div style={style} className={className} onClick={() => {
        if (!startNum) this.startUp()
      }} >
        {
          startNum ? <span className={styles.active} >{endText}({startNum})</span > :
            <span className={styles.notactive} >{beginText}</span >
        }
      </div >
    )
  }
}
