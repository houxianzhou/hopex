import React, { Component } from 'react'
import { classNames } from '@utils'
import ScrollPannel from './components/ScrollPanel'
import styles from './index.less'


export default class View extends Component {
  renderInputItem = () => {
    
  }

  render() {
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
            ahhahah

          </div >
        </ScrollPannel >
      </div >
    )
  }
}

