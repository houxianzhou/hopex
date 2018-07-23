import React, { Component } from 'react'
import { classNames, isEqual, _ } from '@utils'
import { COLORS } from '@constants'
import * as styles from './ColorChange.less'

export default class View extends Component {
  state = {
    percent: 0,
    color: null
  }

  componentDidUpdate(prevProps) {
    const { data: prevData = {}, total: prevTotal = [] } = prevProps
    const { data = {}, total = [] } = this.props
    const prevDataValue = (prevTotal.filter(item => item.dataIndex === data.dataIndex)[0] || {}).dataValue
    const dataValue = data.dataValue

    if (_.isNil(prevDataValue)) {
      setTimeout(() => {
        this.setState({
          percent: '100%',
          color: COLORS.yellowOpacity
        })
      })
    }

    if (!_.isEmpty(data) && !_.isEmpty(total)) {
      if (!_.isNil(prevDataValue) && !isEqual(prevDataValue, dataValue)) {
        setTimeout(() => {
          this.setState({
            percent: '100%',
            color: Number(dataValue) > Number(prevDataValue) ? COLORS.greenOpacity : COLORS.redOpacity
          })
        })
      }
    }

    clearTimeout(this.interval)
    this.interval = setTimeout(() => {
      this.setState({
        percent: '0',
        color: null
      })
    }, 200)
  }

  render() {
    const { color, style = {}, percent, children } = this.props
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
          width: percent || this.state.percent,
          height: '90%',
          background: color || this.state.color,
        }} >
        </div >
        {children}
      </div >
    )
  }
}
