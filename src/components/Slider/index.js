import React, { Component } from 'react'
import Slider, { Range } from 'rc-slider'
import { _ } from '@utils'
import 'rc-slider/assets/index.css'

export default class View extends Component {
  render() {
    const {
      min = 0, max = 100, step = null, included = false, marks = {}, onChange,
      dotStyle, railStyle, handleStyle, trackStyle, activeDotStyle, value, style = {}
    } = this.props

    const props = {
      onChange,
      ...value ? { value } : {},
      marks,
      min,
      max,
      included,
      step,
      dotStyle,
      railStyle,
      handleStyle,
      // 后面两个当开启includetrue时有效
      trackStyle,
      activeDotStyle
    }
    return (
      <div style={{
        width: '100%',
        ...style
      }} >
        <Slider  {...props}  />
      </div >
    )
  }
}
