import React, { Component } from 'react'
import { classNames } from '@utils'
import ScrollPannel from './components/ScrollPanel'
// import { connect } from 'dva'
import * as styles from './index.less'


export default class View extends Component {
  render() {
    return (
      <div
        className={
          classNames(
            {
              view: true
            },
            styles.tradeChart
          )
        }
      >
        <ScrollPannel
          scrollConfig={{
            mouseWheel: false
          }}
        >

        </ScrollPannel >
      </div >
    )
  }
}

