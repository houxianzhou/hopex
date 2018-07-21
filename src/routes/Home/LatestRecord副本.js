import React, { Component } from 'react'
import { classNames, dealInterval, moment } from '@utils'
import switch_render from '@assets/switch_render.png'
import { Mixin } from "@components"
import ScrollPannel from './components/ScrollPanel2'
import styles from './index.less'

export default class View extends Component {

  startInit = () => {
      this.getLatestRecord()
  }

  getLatestRecord = () => {
    const { dispatch, modelName } = this.props
    dispatch({
      type: `${modelName}/getLatestRecord`,
    }).then((res) => {
      dealInterval(() => {
        this.getLatestRecord()
      })
    })
  }

  render() {
    const { model: { latest_records = [] } } = this.props
    const data = latest_records
    return (
      <Mixin.Child that={this} >
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
                  <li key={index} className={classNames(
                    item.type === 'buy' ? styles.buy : styles.sell
                  )} >
                    <span >{moment.formatHMS(String(item.time).split('.')[0] * 1000)}</span >
                    <span className={styles.colorchange} >{item.type === 'buy' ? '买入' : '卖出'}</span >
                    <span className={styles.colorchange} >{item.price}</span >
                    <span >{item.amount}</span >
                  </li >
                ))
              }
            </ul >

          </ScrollPannel >
        </div >
      </Mixin.Child >
    )
  }
}

