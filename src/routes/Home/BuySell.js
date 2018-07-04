import React, { Component } from 'react'
import { InputNumber } from "@components"
import { classNames } from '@utils'
import ScrollPannel from './components/ScrollPanel'
import styles from './index.less'


export default class View extends Component {
  renderInputItem = () => (
    <InputNumber className={styles.input_number} />
  )

  render() {
    const { renderInputItem } = this
    return (
      <div
        style={{
          flexGrow: 1
        }}
        className={
          classNames(
            {
              view: true
            },
            styles.purse
          )
        }
      >
        <ScrollPannel
          scrollConfig={{
            mouseWheel: false
          }}
          header={
            <div >钱包</div >
          }
        >
          <div className={styles.content} >
            {
              renderInputItem()
            }
          </div >
        </ScrollPannel >
      </div >
    )
  }
}

