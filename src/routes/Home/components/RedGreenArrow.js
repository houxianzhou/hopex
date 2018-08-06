import React, { Component } from 'react'
import { _ } from '@utils'
import arrow_down from '@assets/arrow_down.png'
import arrow_top from '@assets/arrow_top.png'
import arrow_down2 from '@assets/arrow_down2.png'
import arrow_top2 from '@assets/arrow_top2.png'


export default class RedGreenArrow extends Component {

  render() {
    const { RG = 1, alt, ...rest } = this.props
    if (alt === 'top') {
      return (
        <img {...rest} alt='top' src={RG ? arrow_top : arrow_top2} />
      )
    } else {
      return <img {...rest} alt='down' src={RG ? arrow_down : arrow_down2} />
    }
  }
}
