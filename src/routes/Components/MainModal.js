import React, { Component } from 'react'
import { Modal } from "@components"
import { classNames } from '@utils'
import close from '@assets/close.png'
import * as styles from './MainModal.less'

export default class MainModal extends Component {
  render() {
    const { children, title, dispatch, modelName, className, modalProps = {},} = this.props
    return (
      <Modal {...modalProps}>
        <div className={
          classNames(
            styles.mainmodal,
            // theme,
            className,

          )
        } >
          {
            title ? (
              <div className='header' >
                {title}
                <div
                  className='close'
                  onClick={() => {
                    dispatch({
                      type: `${modelName}/closeModal`
                    })
                  }}
                >
                  <img alt='close' src={close} />
                </div >
              </div >
            ) : null
          }

          <div className='content' >
            {children}
          </div >
        </div >
      </Modal >
    )
  }
}
