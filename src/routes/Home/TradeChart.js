import React, { Component } from 'react'
import { classNames } from '@utils'
import ScrollPannel from './components/ScrollPanel'
// import { connect } from 'dva'
// import styles from './index.less'


export default class View extends Component {
  render() {
    return (
      <div
        style={{
          'flexGrow': 1
        }}
        className={
          classNames(
            {
              view: true
            }
          )
        }
      >
        <ScrollPannel >

        </ScrollPannel >
      </div >
    )
  }
}

