import React, { Component } from 'react'
import { connect } from 'dva'
import { _ } from '@utils'
import arrow_down from '@assets/arrow_down.png'
import arrow_top from '@assets/arrow_top.png'
import arrow_down2 from '@assets/arrow_down2.png'
import arrow_top2 from '@assets/arrow_top2.png'


@connect(({ theme: model }) => ({
  model,
}))
class RedGreenArrow extends Component {
  render() {
    const { model: { RG = 1 }, alt, } = this.props
    if (alt === 'top') {
      return (
        <img alt='top' src={RG ? arrow_top : arrow_top2} />
      )
    } else {
      return <img alt='down' src={RG ? arrow_down : arrow_down2} />
    }
  }
}


@connect(({ theme: model }) => ({
  model,
}))
class RedText extends Component {
  render() {
    const { model: { RG = 1 }, children, value } = this.props
    return (
      <span className='red' >{value}</span >
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
      <span className='green' >{value}</span >
    )
  }
}


export default {
  RedGreenArrow,
  RedText,
  GreenText
}
