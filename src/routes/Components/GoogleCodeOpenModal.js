import React, { Component } from 'react'
import { Button, RouterGo } from '@components'
import { PATH } from "@constants"
import MainModal from '@routes/Components/MainModal'
import * as styles from './GoogleCodeOpenModal.less'

export default class GoogleCodeOpenModal extends Component {
  render() {
    const props = {
      ...this.props
    }
    const { closeModal, } = this.props
    return (
      <MainModal {...props}  >
        <div className={styles.googleCodeOpen_Modal} >
          <div className={styles.content} >
            请先开启谷歌验证
          </div >
          <div className={styles.buttons} >

            <div
              onClick={() => {
                closeModal()
              }}
              className={styles.cancel}
            >
              取消
            </div >
            <div
              className={styles.confirm}
              onClick={() => {
                closeModal()
              }}
            >
              <Button >
                <RouterGo.SwitchRoute value={PATH.myaccount} >去开启</RouterGo.SwitchRoute >
              </Button >

            </div >
          </div >
        </div >

      </MainModal >
    )
  }
}
