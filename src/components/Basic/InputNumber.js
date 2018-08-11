import React, { Component } from 'react'
import { BigNumber } from 'bignumber.js'
import { classNames, Patterns, _, isEqual } from '@utils'
import * as styles from './InputNumber.less'

export default class View extends Component {

  componentWillUnmount() {
    this.interval && clearTimeout(this.interval)
  }

  rules = (value) => {
    let { step = 10, max, min, prec = step, onChange } = this.props

    if (!_.isNil(value) && !_.isNil(step)) {
      step = Number(step)
      max = Number(max)
      min = Number(min)
    }

    if (!_.isNil(value) && value !== '') {
      // console.log(value, '------------')
      if (!/\.$/.test(value)) {
        if (value < min) value = min
        if (value > max) value = max
        const v = new BigNumber(value)
        const int = Math.floor(v.div(prec).valueOf())
        const floa = v.minus(int * step).valueOf()
        // console.log(int, floa, prec)
        if (floa >= (new BigNumber(prec)).div(2).valueOf()) {
          value = (int + 1) * prec
        } else {
          value = int * prec
        }
        // if (value < prec) value = prec
      }
      onChange(value)
    } else {
      onChange('')
    }
  }

  componentDidUpdate(prevProps) {
    const { value: prevValue } = prevProps
    const { value } = this.props
    // clearTimeout(this.interval)
    if (!isEqual(prevValue, value)) {
      this.rules(value)
      // this.interval = setTimeout(() => {
      //   this.rules(value)
      // })
    }
    // if (!isEqual(prevValue, value) && !_.isNil(value)
    //   && !_.inRange(Number(value), Number(min) || window['-Infinity'], Number(max) || window.Infinity)
    //   && _.isFunction(onChange)) {
    //   this.interval = setTimeout(() => {
    //     onChange(_.clamp(Number(value), Number(min) || window['-Infinity'], Number(max) || window.Infinity))
    //   })
    // }
  }

  render() {
    let { value = null, step } = this.props
    const {
      className = {}, style = {}
    } = this.props

    const { rules } = this

    step = Number(step)


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
                let result = new BigNumber(Number(value))
                result = result.minus(step)
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
