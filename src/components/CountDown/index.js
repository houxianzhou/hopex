import React, { Component } from 'react'
import { _ } from '@utils'

export default class View extends Component {

  state = {
    startNum: null
  }

  componentDidMount() {
    const { auto = false, onClick } = this.props
    if (auto && _.isFunction(onClick)) {
      this.startUp()
    }
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

  startUp = () => {
    const { onClick } = this.props
    if (_.isFunction(onClick)) onClick()
    this.countDown()
  }

  render() {
    const { startNum } = this.state
    const { beginText = '点击发送', endText = '重新发送', style = {}, className } = this.props
    return (
      <div style={style} className={className} onClick={() => {
        if (!startNum) this.startUp()
      }} >
        {
          startNum ? `${endText}(${startNum})` : beginText
        }
      </div >
    )
  }
}
