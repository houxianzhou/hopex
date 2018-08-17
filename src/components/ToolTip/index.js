import React, { Component } from 'react'
import ReactTooltip from 'react-tooltip'
import { _ } from '@utils'

export default class ToolTip extends Component {
  render() {
    const { tip = '', children } = this.props
    const id = _.uniqueId()
    return (
      <>
        <p data-tip={tip} data-for={id} > {children} </p >
        <ReactTooltip place="top" id={id} type="dark" effect="float" />
      </>
    )
  }

}

