import React, { Component } from 'react'
import Slider, { Range } from 'rc-slider'
import { _ } from '@utils'
import 'rc-slider/assets/index.css'

export default class View extends Component {
  render() {
    const {
      min = 0, max = 100, step = null, included = false, marks = {}, onChange,
      dotStyle, railStyle, handleStyle
    } = this.props

    const props = {
      marks,
      min,
      max,
      included,
      step,
      dotStyle,
      railStyle,
      handleStyle
    }
    return (
      <Slider  {...props} onChange={onChange} />
    )
  }
}
