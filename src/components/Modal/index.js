import React, { Component } from 'react'
import { connect } from 'dva'
import { default as RModal } from 'react-modal'
import Modal from 'react-modal'
import { ROOT } from '@constants'

@connect(({ modal: model, loading, dispatch }) => ({
  model,
  modelName: 'modal',
  loading,
  dispatch,
}))
export default class View extends Component {
  render() {
    const { children, model: { state }, onAfterOpen, style = {} } = this.props
    return (
      <Modal
        style={style}
        onAfterOpen={onAfterOpen}
        isOpen={state}
      >
        {children}
      </Modal >
    )
  }
}

RModal.setAppElement(ROOT)
