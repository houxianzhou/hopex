import React, { Component } from 'react'
import { COLORS } from '@constants'
import { Mixin, Slider } from "@components"
import { classNames, getPercent, formatNumber, _ } from '@utils'
import grayangle from '@assets/grayangle.png'
import activeangle from '@assets/activeangle.png'
import ScrollPannel from './components/ScrollPanel'
import MainModal from './components/MainModal'
import styles from './index.less'


export default class View extends Component {

  startInit = () => {
    this.getLeverage()
  }

  getLeverage = () => {
    const { dispatch, modelName } = this.props
    dispatch({
      type: `${modelName}/getLeverage`
    })
  }

  render() {
    const { model: { marketName, leverage, }, modal: { name }, dispatch, modelName } = this.props
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
                        type: `${modelName}/openModal`,
                        payload:{
                          name: 'contract'
                        }
                      })
                    }}
                  >编辑
                  </div >
                </div >
                <div className={styles.number} >
                  {leverage}
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
          {
            name === 'contract' ? (<RenderModal {...this.props} />) : null
          }
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
      ...this.props,
      title: '设置杠杆倍数'
    }

    const { model: { levelages = [], keepBailRate, leverage, }, dispatch, modelName } = this.props
    const { currentValue } = this.state
    const marks = levelages.reduce((sum, next = {}) => {
      const leverage = next.leverage
      sum[leverage] = String(leverage)
      return sum
    }, {})
    const marksProps = {
      marks,
      defaultValue: leverage,
      min: _.min(_.keys(marks).map(item => Number(item))) || 0,
      max: _.max(_.keys(marks).map(item => Number(item))) || 0,
      included: false,
      step: null,
      dotStyle: {
        width: '1px',
        marginLeft: 'unset',
        backgroundColor: COLORS.yellow,
        border: 'none',
        bottom: 0
      },
      railStyle: {
        height: '1px',
        backgroundColor: COLORS.yellow,
      },
      handleStyle: {
        marginTop: '-10px',
        width: '20px',
        height: '20px',
        border: 'solid 6px white',
        backgroundColor: COLORS.yellow
      },
      onChange: (v) => {
        this.setState({
          currentValue: v
        })
      }
    }

    return (
      <MainModal {...props} className={styles.currentContract_modal} >
        <div className={styles.content} >
          <div className={styles.top} >
            <div className={styles.current} >当前倍数</div >
            <div className={styles.number} >{leverage}<span >倍</span ></div >
          </div >
          <div className={styles.middle} >
            <Slider {...marksProps} />
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
                      {
                        String(item.leverage) === String(leverage) ? (
                          <div className={styles.symbol} >
                            <div >
                              当前值
                            </div >
                            <img src={grayangle} />
                          </div >
                        ) : null
                      }
                      {
                        currentValue && String(currentValue) !== String(leverage) && String(item.leverage) === String(currentValue) ? (
                          <div className={styles.symbol} >
                            <div >
                              新值
                            </div >
                            <img src={activeangle} />
                          </div >
                        ) : null
                      }

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
          <div
            onClick={() => {
              dispatch({
                type: `${modelName}/closeModal`,
              })
            }}
          >
            取消
          </div >
          <div
            className={styles.confirm}
            onClick={() => {
              let promise = null
              if (currentValue === leverage || !currentValue) {
                promise = Promise.resolve()
              } else {
                promise = dispatch({
                  type: `${modelName}/doUpdateLeverage`,
                  payload: {
                    leverage: currentValue
                  }
                })
              }
              promise.then(res => {
                dispatch({
                  type: `${modelName}/closeModal`,
                })
              })
            }}
          >
            确定
          </div >
        </div >
      </MainModal >
    )
  }
}

