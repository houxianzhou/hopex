import React, { Component } from 'react'
import { classNames } from '@utils'
import ScrollPannel from './components/ScrollPanel'
import styles from './index.less'


export default class View extends Component {
  render() {
    return (
      <div
        style={{
          height: 344,
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
          theader={
            <div >钱包</div >
          }
        >
        </ScrollPannel >
      </div >
    )
  }
}

