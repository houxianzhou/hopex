import React, { Component } from 'react'
import { connect } from 'dva'
import { Mixin } from '@components'
import ScrollPannel from './components/ScrollPanel'
import styles from './index.less'
import switch_render from '@assets/switch_render.png'

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
      price: '90000.00',
      count: '345,789'
    })
    return (
      <div
        style={{
          width: 400
        }}
        className={styles.pannel}
      >
        <ScrollPannel
          header={
            <div className={styles.record_header} >
              <span >最新成交</span >
              <img src={switch_render} />
            </div >
          }
          theader={
            <ul className={styles.record_theader} >
              <li >
                <span >时间</span >
                <span >方向</span >
                <span >价格</span >
                <span >数量(张)</span >
              </li >
            </ul >
          }
          style={{ height: 488 }} >
          <ul className={styles.record_content} >
            {
              data.map((item, index) => (
                <li key={index} >
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

