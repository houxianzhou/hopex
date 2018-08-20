import React, { Component } from 'react'
import { BigNumber } from 'bignumber.js'
import { classNames, Patterns, _, isEqual } from '@utils'
import * as styles from './InputNumber.less'

export default class View extends Component {

  componentWillUnmount() {
    this.interval && clearTimeout(this.interval)
  }

  rules = (value) => {
    let { step = 10, max, min, prec = 0, onChange } = this.props
    if (!_.isNil(value) && !_.isNil(step)) {
      // value=Number(value)
      // step = scientificToNumber(step)
      max = Number(max)
      min = Number(min)
    }

    if (!_.isNil(value) && value !== '') {
      let test1 = /\.$/.test(value)
      let test2 = /^(((\\d+.?\\d+)|(\\d+))[Ee]{1}((-(\\d+))|(\\d+)))$/.test(value)


      if (test1) {
      } else {
        if (value < min) value = min
        if (value > max) value = max
        const int = Math.floor((new BigNumber(value)).div(step).toFixed(prec))
        value = int * step
        if (_.isInteger(value)) {
          prec = 0
        }
        value = (new BigNumber(value)).toFixed(prec)
      }
      onChange(value)
    } else {
      onChange('')
    }
  }

  componentDidUpdate(prevProps) {
    const { value: prevValue } = prevProps
    const { value } = this.props
    if (!isEqual(prevValue, value)) {
      this.rules(value)
    }
  }

  render() {

    let { value = null, step } = this.props
    const {
      className = {}, style = {}
    } = this.props

    const { rules } = this
    step = Number(step)
    // console.log(step)
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
                // result = result.minus(step)
                rules(result)
              }
            }
          }
        >-
        </div >
        <input value={value} onChange={(e) => {
          if (Patterns.decimalNumber.test(e.target.value) || e.target.value === '') {
            rules(e.target.value.replace('。', '.'))
          }
        }} />
        <div onClick={
          () => {
            if (!_.isNil(value)) {
              let result = Number(value) + Number(step)
              // result = result.plus(step).valueOf()
              rules(result)
            }
          }
        } >+
        </div >
      </div >
    )
  }
}
