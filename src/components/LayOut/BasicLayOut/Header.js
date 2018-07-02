import React, { Component } from 'react'
import { connect } from 'dva'
import Responsive from '@components/Responsive'


@connect(({ loading, dispatch }) => ({
  loading,
  dispatch,
}))
export default class View extends Component {
  render() {
    return (
      <div >
        <Responsive minW cN='pipei' style={{ background: 'red' }} notMatch={null} >
          hahahah
        </Responsive >
      </div >
    )
  }
}
