import React, { Component } from 'react'
import { connect } from 'dva'
import { _, classNames } from '@utils'
import { arrow_down, arrow_down2, arrow_top, arrow_top2 } from '@assets'


@connect(({ theme: model }) => ({
  model,
}))
class RedGreenArrow extends Component {
  render() {
    const { model: { RG = 1 }, alt, style = {} } = this.props
    if (alt === 'top') {
      return (
        RG ? <span style={style} >{arrow_top}</span > : <span style={style} >{arrow_top2}</span >
      )
    } else if (alt === 'down') {
      return RG ? <span style={style} >{arrow_down}</span > : <span style={style} >{arrow_down2}</span >
    } else {
      return null
    }
  }
}


@connect(({ theme: model }) => ({
  model,
}))
class RedText extends Component {
  render() {
    const { model: { RG = 1 }, value } = this.props

    return (
      <span className={
        classNames(
          RG ? 'red' : 'green'
        )
      } >{value}</span >
    )
  }
}

@connect(({ theme: model }) => ({
  model,
}))
class GreenText extends Component {
  render() {
    const { model: { RG = 1 }, value, } = this.props
    return (
      <span className={
        classNames(
          RG ? 'green' : 'red'
        )
      } >{value}</span >
    )
  }
}


@connect(({ theme: model }) => ({
  model,
}))
class MarkText extends Component {
  render() {
    const { model: { RG = 1 }, value, mark = value, } = this.props
    const green = RG ? 'green' : 'red'
    const red = RG ? 'red' : 'green'
    return (
      <span className={
        classNames(
          (/[\+\-]/.test(mark)) ? (
            (/\+/.test(mark)) ? green : red
          ) : null
        )
      } >{value}</span >
    )
  }
}


export default {
  RedGreenArrow,
  RedText,
  GreenText,
  MarkText,
  SwitchColor: (color1, color2, RG = 1) => {
    return RG ? color1 : color2
  }
}
