import React, { Component } from 'react'
import { Mixin, Modal } from "@components"
import { classNames } from '@utils'
import ScrollPannel from './components/ScrollPanel'
import styles from './index.less'


export default class View extends Component {
  render() {
    const { model: { marketName } } = this.props
    const colors = [
      '#52AA64', '#52AA64', '#8CB152', '#8CB152', '#CABA70', '#CABA70', '#D69555', '#D69555', '#D47D5A', ' #D47D5A'
    ]
    return (
      <Mixin.Child that={this} >
        <div
          className={
            classNames(
              {
                view: true
              },
              styles.currentContract
            )
          }
        >
          <ScrollPannel
            header={
              <div className={styles.header} >
                当前合约
                <span >
                  {marketName}
                </span >
              </div >
            }
          >
            <div className={styles.content} >
              <div className={styles.top} >
                <div className={styles.desc} >
                  <div >杠杆倍数</div >
                  <div className={styles.edit} >编辑</div >
                  <Modal>ddddd</Modal>
                </div >
                <div className={styles.number} >
                  50
                  <span >倍</span >
                </div >

              </div >
              <div className={styles.down} >
                <div >自动减仓队列</div >
                <ul >
                  {
                    colors.map((item, index) => (
                      <li key={index} style={{ background: item }} />
                    ))
                  }
                </ul >

              </div >
            </div >
          </ScrollPannel >
        </div >
      </Mixin.Child >
    )
  }
}

