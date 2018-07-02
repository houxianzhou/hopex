import React, { Component } from 'react'
import { connect } from 'dva'
import { Mixin } from '@components'
import ScrollPannel from './components/ScrollPanel'
import styles from './index.less'

// @connect(({ home: model, user, loading, dispatch }) => ({
//   user,
//   model
// }))
export default class View extends Component {
  componentDidMount() {
    console.log('task1子组件')
  }

  render() {
    const data = (new Array(100)).fill({
      time: '17:28:23',
      direaction: '买入',
      price: '900',
      count: '345'
    })
    return (
      <div style={{
        width: 400,
        height: 560
      }} >
        <ScrollPannel header theader >
          <ul className={styles.record} >
            {
              data.map((item, index) => (
                <li key={index}>
                  <span >{item.time}</span >
                  <span >{item.direaction}</span >
                  <span >{item.price}</span >
                  <span >{item.count}</span >
                </li >
              ))
            }
          </ul >

        </ScrollPannel >
      </div >
    )
  }
}

