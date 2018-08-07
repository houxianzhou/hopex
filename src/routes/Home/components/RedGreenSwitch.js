import React, { Component } from 'react'
import { connect } from 'dva'
import { _, classNames } from '@utils'
import arrow_down from '@assets/arrow_down.png'
import arrow_top from '@assets/arrow_top.png'
import arrow_down2 from '@assets/arrow_down2.png'
import arrow_top2 from '@assets/arrow_top2.png'


@connect(({ theme: model }) => ({
  model,
}))
class RedGreenArrow extends Component {
  render() {
    const { model: { RG = 1 }, alt, style = {} } = this.props
    if (alt === 'top') {
      return (
        <img style={style} alt='top' src={RG ? arrow_top : arrow_top2} />
      )
    } else {
      return <img style={style} alt='down' src={RG ? arrow_down : arrow_down2} />
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


export default {
  RedGreenArrow,
  RedText,
  GreenText,
  SwitchColor: (color1, color2, RG = 1) => {
    return RG ? color1 : color2
  }
}
