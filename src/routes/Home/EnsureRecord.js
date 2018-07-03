import React, { Component } from 'react'
import { classNames } from '@utils'
import ScrollPannel from './components/ScrollPanel'
// import { connect } from 'dva'
import styles from './index.less'


export default class View extends Component {
  render() {
    const dataTop = (new Array(8)).fill({
      price: '9000.00',
      count: 128.763,
      total: '7, 892, 394'
    })
    const dataDown = (new Array(8)).fill({
      price: '9000.00',
      count: 128.763,
      total: '7, 892, 394'
    })
    return (
      <div
        style={{
          width: 400
        }}
        className={
          classNames(
            {
              view: true
            },
            styles.ensureRecord
          )
        }
      >
        <ScrollPannel
          header={
            <div >
              <span >委托列表</span >
            </div >
          }
        >
          <div className={styles.content} >
            <div className={
              classNames(
                styles.top
              )
            } >
              <div className={styles.theader} >
                <ul >
                  <li >
                    <span >价格</span >
                    <span >数量</span >
                    <span >累计数量(张)</span >
                  </li >
                </ul >
              </div >
              <ul >
                {
                  dataTop.map((item, index) => (
                    <li key={index} >
                      <span >{item.price}</span >
                      <span >{item.count}</span >
                      <span >{item.total}</span >
                    </li >
                  ))
                }

              </ul >
            </div >
            <div className={styles.center} >
              <div className={styles.left} >9334.5</div >
              <div className={styles.right} >90000.0/9200.0</div >
            </div >
            <div className={
              classNames(
                styles.down
              )
            } >
              <div className={styles.theader} >
                <ul >
                  <li >
                    <span >价格</span >
                    <span >数量</span >
                    <span >累计数量(张)</span >
                  </li >
                </ul >
              </div >
              <ul >
                {
                  dataDown.map((item, index) => (
                    <li key={index} >
                      <span >{item.price}</span >
                      <span >{item.count}</span >
                      <span >{item.total}</span >
                    </li >
                  ))
                }
              </ul >
            </div >
          </div >
        </ScrollPannel >
      </div >
    )
  }
}

