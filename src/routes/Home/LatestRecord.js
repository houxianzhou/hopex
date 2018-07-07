import React, { Component } from 'react'
import { classNames, dealInterval } from '@utils'
import ScrollPannel from './components/ScrollPanel'
import styles from './index.less'
import switch_render from '@assets/switch_render.png'


export default class View extends Component {
  componentDidMount() {
    this.startInit()
  }

  startInit = () => {
    this.getEnsureRecord()
  }

  getEnsureRecord() {
    const { dispatch, modelName } = this.props
    dispatch({
      type: `${modelName}/getLatestRecord`,
      payload: {
        mode: 'http'
      }
    }).then((res) => {
      dealInterval(() => {
        this.getEnsureRecord()
      })
    })
  }

  render() {
    const { model: { latest_records } } = this.props
    const data = latest_records
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
                  <span >{'暂无'}</span >
                  <span >{item.type === 'buy' ? '买入' : '卖出'}</span >
                  <span >{item.price}</span >
                  <span >{item.amount}</span >
                </li >
              ))
            }
          </ul >

        </ScrollPannel >
      </div >
    )
  }
}

