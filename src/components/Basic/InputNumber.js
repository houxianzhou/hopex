import React, { Component } from 'react'
import { classNames, Patterns, _, isEqual } from '@utils'
import * as styles from './InputNumber.less'

export default class View extends Component {

  componentWillUnmount() {
    clearTimeout(this.interval)
  }

  componentDidUpdate(prevProps) {
    const { value: prevValue } = prevProps
    const { value, max, min = 0, onChange } = this.props
    if (!isEqual(prevValue, value) && !_.isNil(value)
      && !_.inRange(Number(value), Number(min) || window['-Infinity'], Number(max) || window.Infinity)
      && _.isFunction(onChange)) {
      this.interval = setTimeout(() => {
        onChange(_.clamp(Number(value), Number(min) || window['-Infinity'], Number(max) || window.Infinity))
      })
    }
  }

  render() {
    let { value = null, step = 10, max, min, } = this.props
    const {
      onChange, className = {}, style = {}
    } = this.props
    if (!_.isNil(value) && !_.isNil(step)) {
      value = value
      step = Number(step)
      max = Number(max)
      min = Number(min)
    }

    const rules = (value) => {
      if (!_.isNil(value)) {
        if (value < min) value = min
        if (value > max) value = max
        onChange(value)
      } else {
        onChange('')
      }
    }

    return (
      <div
        style={style}
        className={classNames(
          styles.input_number,
          className
        )} >
        <div
          onClick={
            () => {

              if (!_.isNil(value)) {
                let result = Number(value) - step
                rules(result)
              }
            }
          }
        >-
        </div >
        <input value={value} onChange={(e) => {
          if (Patterns.decimalNumber.test(e.target.value) || e.target.value === '') {
            rules(e.target.value)
          }
        }} />
        <div onClick={
          () => {
            if (!_.isNil(value)) {
              let result = step + Number(value)
              rules(result)
            }
          }
        } >+
        </div >
      </div >
    )
  }
}
