import React, { Component } from 'react'
import { classNames } from '@utils'
import ScrollPannel from './components/ScrollPanel'
import styles from './index.less'


export default class View extends Component {
  render() {
    return (
      <div
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
        </ScrollPannel >
      </div >
    )
  }
}

