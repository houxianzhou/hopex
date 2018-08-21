import React, { Component } from 'react'
import { connect } from 'dva'


export default class View extends Component {
  render() {
    const { model: { marketTradePage } } = this.props
    return (
      <div >
        hahahahah{marketTradePage}
      </div >
    )
  }
}
