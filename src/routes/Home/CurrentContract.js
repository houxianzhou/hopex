import React, { Component } from 'react'
import Slider, { Range } from 'rc-slider'
import { Mixin } from "@components"
import { classNames, getPercent, formatNumber, _ } from '@utils'
import grayangle from '@assets/grayangle.png'
import activeangle from '@assets/activeangle.png'
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

class RenderModal extends Component {
  state = {
    currentValue: null
  }

  render() {
    const props = {
      ...this.Props,
      title: '设置杠杆倍数'
    }


    const { model: { levelages = [], keepBailRate }, } = this.props
    const marks = levelages.reduce((sum, next = {}) => {
      const leverage = next.leverage
      sum[leverage] = String(leverage)
      return sum
    }, {})
    const marksProps = {
      marks,
      min: _.min(_.keys(marks).map(item => Number(item))) || 0,
      max: _.max(_.keys(marks).map(item => Number(item))) || 0,
      included: false,
      step: null
    }


    return (
      <MainModal {...props} className={styles.currentContract_modal} >
        <div className={styles.content} >
          <div className={styles.top} >
            <div className={styles.current} >当前倍数</div >
            <div className={styles.number} >50<span >倍</span ></div >
          </div >
          <div className={styles.middle} >
            <Slider  {...marksProps}  />
          </div >
          <div className={styles.down} >
            <ul >
              <li key={0} >
                <div >杠杆倍数</div >
                <div >起始保证金率</div >
                <div >维持保证金率</div >
              </li >
              {
                levelages.map((item, index) => {
                  return (
                    <li key={index + 1} >
                      <div className={styles.symbol} >
                        <div >
                          当前值
                        </div >
                        <img src={grayangle} />
                      </div >
                      <div >{item.leverage}</div >
                      <div >{getPercent(Number(1), Number(item.leverage))}</div >
                      <div >{formatNumber(keepBailRate, 2)}</div >
                    </li >
                  )
                })
              }
            </ul >
          </div >

        </div >
        <div className={styles.buttons} >
          <div >取消</div >
          <div className={styles.confirm} >确定</div >
        </div >
      </MainModal >
    )

  }

}

