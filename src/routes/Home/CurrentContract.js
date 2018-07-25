import React, { Component } from 'react'
import Slider, { Range } from 'rc-slider'
import { Mixin } from "@components"
import { classNames } from '@utils'
import ScrollPannel from './components/ScrollPanel'
import MainModal from './components/MainModal'
import styles from './index.less'
import 'rc-slider/assets/index.css'


export default class View extends Component {
  render() {
    const { model: { marketName }, dispatch, modelName } = this.props
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
                  <div
                    className={styles.edit}
                    onClick={() => {
                      dispatch({
                        type: `${modelName}/openModal`
                      })
                    }}
                  >编辑
                  </div >
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
          <RenderModal {...this.props} />
        </div >
      </Mixin.Child >
    )
  }
}

const RenderModal = (Props) => {
  const props = {
    ...Props,
    title: '设置杠杆倍数'
  }


  const marks = {
    0: '0',
    1: '1',
    2: '2',
    3: '3',
  }


  return (
    <MainModal {...props} className={styles.currentContract_modal} >
      <div className={styles.content} >
        <div>
          <div>当前倍数</div>
        </div>
        <Slider marks={marks} min={0} max={20} defaultValue={3} included={false} step={null} />
      </div >
    </MainModal >
  )
}

