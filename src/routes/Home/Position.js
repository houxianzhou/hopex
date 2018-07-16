import React, { Component } from 'react'
import { classNames } from '@utils'
import { Table } from '@components'
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
            styles.position
          )
        }
      >
        <ScrollPannel
          scrollConfig={{
            mouseWheel: false,
            scrollbar: false
          }}
          header={
            <div >当前持仓</div >
          }
        >
          <Table></Table>

        </ScrollPannel >
      </div >
    )
  }
}

