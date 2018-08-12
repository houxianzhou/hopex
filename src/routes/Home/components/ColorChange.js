import React, { Component } from 'react'
import { classNames, isEqual, _, dealInterval } from '@utils'
import { COLORS } from '@constants'
// import Worker from 'worker-loader!../file.worker.js'
//
// const worker = new Worker()

let throttle
export default class ColorChange extends Component {
  componentDidMount() {
    // worker.addEventListener('message', (event) => {
    //   const { prevDataValue, dataValue, prevTotal, total, RG } = event.data
    //   if (!_.isNil(dataValue) && !isEqual(prevTotal, total)) {
    //     const { colorChange } = this
    //     let color = null
    //     if (_.isNil(prevDataValue)) {
    //       color = COLORS.yellowOpacity
    //       colorChange(color)
    //     } else if (!isEqual(prevDataValue, dataValue)) {
    //       color = Number(dataValue) > Number(prevDataValue) ?
    //         (RG ? COLORS.greenOpacity : COLORS.redOpacity) :
    //         (RG ? COLORS.redOpacity : COLORS.greenOpacity)
    //       colorChange(color)
    //     }
    //   }
    // })
  }

  state = {
    percent: 0,
    color: null
  }

  colorChange = (color) => {
    this.interval && clearTimeout(this.interval)
    this.setState({
      percent: '100%',
      color
    })
    this.interval = dealInterval(() => {
      this.setState({
        // percent: '0',
        color: null
      })
      this.interval = null
    }, 300)
  }

  componentDidUpdate(prevProps) {
    const { data: prevData = {}, total: prevTotal = [] } = prevProps
    const { data = {}, total = [], RG } = this.props
    const prevDataValue = (prevTotal.filter(item => item.dataIndex === data.dataIndex)[0] || {}).dataValue
    const dataValue = data.dataValue
    if (!_.isNil(dataValue) && !isEqual(prevTotal, total)) {
      if (!throttle) {
        throttle = _.throttle(
          () => {
            const { colorChange } = this
            let color = null
            if (_.isNil(prevDataValue)) {
              color = COLORS.yellowOpacity
              colorChange(color)
            } else if (!isEqual(prevDataValue, dataValue)) {
              color = Number(dataValue) > Number(prevDataValue) ?
                (RG ? COLORS.greenOpacity : COLORS.redOpacity) :
                (RG ? COLORS.redOpacity : COLORS.greenOpacity)
              colorChange(color)
            }
            throttle = null
          }, 200)
        throttle()
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.interval)
  }

  render() {
    const { color, style = {}, percent, children, all = false, ...rest } = this.props
    const getStyle = {
      ...{
        left: 0,
        width: '100%',
        height: '100%',
        position: all ? 'absolute' : 'relative',
        display: 'flex',
        alignItems: 'center',
      },
      ...style
    }
    return (
      <div style={all ? {
        display: 'flex',
        alignItems: 'center',
      } : getStyle} >
        <div style={{
          position: 'absolute',
          left: all ? 0 : -5,
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
