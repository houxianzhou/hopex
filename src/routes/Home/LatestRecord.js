import React, { Component } from 'react'
// import { connect } from 'dva'
import { classNames } from '@utils'
import ScrollPannel from './components/ScrollPanel'
import styles from './index.less'
import switch_render from '@assets/switch_render.png'


export default class View extends Component {
  // componentDidMount() {
  //   const { model: { market }, dispatch, modelName } = this.props
  //   dispatch({
  //     type: `${modelName}/getLatestRecord`
  //   })
  // }

  render() {
    const data = (new Array(100)).fill({
      time: '17:28:23',
      direaction: '买入',
      price: '90000.00',
      count: '345,789'
    })
    return (
      <div
        className={
          classNames(
            {
              view: true
            },
            styles.latestRecord
          )
        }
      >
        <ScrollPannel
          scrollConfig={{
            style: { height: 494 },
            scrollbar: true,
          }}
          header={
            <div className={styles.record_header} >
              <span >最新成交</span >
              <img alt='switch' src={switch_render} />
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
        >
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

