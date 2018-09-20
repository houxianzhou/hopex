import React, { Component } from 'react'
import { PATH } from "@constants"
import { _ } from '@utils'
import * as styles from './ColorStack.less'

export default class ColorStack extends Component {
  render() {

    const { colors = [
      '#52AA64', '#52AA64', '#8CB152', '#8CB152', '#CABA70', '#CABA70', '#D69555', '#D69555', '#D47D5A', ' #D47D5A'
    ], style, getStyle } = this.props
    return (
      <ul className={styles.colorstacks}>
        {
          colors.map((item, index) => (
            <li key={index} style={style || (_.isFunction(getStyle) && getStyle(item, index))||{}} />
          ))
        }
      </ul >
    )
  }
}
