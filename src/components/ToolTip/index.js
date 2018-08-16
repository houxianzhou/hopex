import React, { Component } from 'react'
import ReactTooltip from 'react-tooltip'

export default class ToolTip extends Component {
  render() {
    return (
      <>
        <span data-tip="React-tooltip" > </span >
        <ReactTooltip id='sadFace' type='warning' effect='solid' data-tip='hh' >
          <span >Show sad face</span >
        </ReactTooltip >
      </>
    )
  }

}

