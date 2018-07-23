import React, { Component } from 'react'
import { classNames, isEqual } from '@utils'
import * as styles from './ColorChange.less'

export default class View extends Component {
  state = {
    percent: 0
  }

  componentDidUpdate(prevProps) {
    const { data, total } = prevProps
    const { data: currentData, total: currentTotal } = this.props
    if (!isEqual(total, currentTotal)) {
      if (currentData !== data && Math.abs(currentData - data) > 0) {
        this.setState({
          percent: this.props.percent
        })
      } else {
        this.setState({
          percent: 0
        })
      }
    }
  }

  render() {
    const { color = '', percent = '100%', style = {}, children } = this.props
    return (
      <div style={
        {
          ...{
            width: '100%',
            height: '100%',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
          },
          ...style
        }
      } >
        <div style={{
          position: 'absolute',
          left: -5,
          width: percent,
          height:'90%',
          background: color,
        }} >
        </div >
        {children}
      </div >
    )
  }
}
