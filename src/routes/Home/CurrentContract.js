import React, { Component } from 'react'
import { COLORS } from '@constants'
import { Mixin, Slider, Toast, Button } from "@components"
import { classNames, getPercent, _, dealInterval } from '@utils'
import grayangle from '@assets/grayangle.png'
import activeangle from '@assets/activeangle.png'
import MainModal from '@routes/Components/MainModal'
import ColorStack from '@routes/Components/ColorStack'
import ScrollPannel from './components/ScrollPanel'
import styles from './index.less'


export default class CurrentContract extends Component {

  startInit = () => {
    this.getLeverage()
  }

  getLeverage = () => {
    const { dispatch, modelName } = this.props
    dispatch({
      type: `${modelName}/getLeverage`
    }).then(res => {
      if (!this._isMounted || this.interval) return
      this.interval = dealInterval(() => {
        this.interval = null
        this.getLeverage()
      })
    })
  }

  render() {
    const { model: { marketName, leverage, leverageIsModify = false }, modal: { name }, isLogin, openModal, } = this.props
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
                      leverageIsModify ? openModal({
                        name: 'contract'
                      }) : Toast.tip('当前有该合约持仓或委托，无法修改杠杆倍数')
                    }}
                  >
                    {
                      isLogin ? '编辑' : null
                    }
                  </div >
                </div >
                <div className={styles.number} >
                  {leverage}
                  <span >倍</span >
                </div >
              </div >
              <div className={styles.down} >
                <div >自动减仓列队</div >
                <ColorStack getStyle={(item) => ({
                  background: isLogin ? item : null,
                  border: isLogin ? null : '1px solid #3E4555'
                })} />
              </div >
            </div >
          </ScrollPannel >
          {
            name === 'contract' ? (<RenderModal {...this.props} getLeverage={this.getLeverage} />) : null
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
      modalProps: {
        style: {
          width: 800,
        },
      },
      ...this.props,
      title: '设置杠杆倍数'
    }

    let { model: { leverages = [], keepBailRate, leverage, }, getLeverage, dispatch, modelName, closeModal, loading } = this.props
    const { currentValue } = this.state
    leverages = _.orderBy(leverages, (item = {}) => Number(item.leverage))
    let maxLeverge = leverages[leverages.length - 1] || {}

    let marks = leverages.reduce((sum, next = {}, index) => {
      const avarageLeverge = maxLeverge.leverage / ((leverages.length - 1) || 1)
      const leverage = next.leverage
      sum[Number(avarageLeverge * index)] = String(leverage)
      return sum
    }, {})

    const marksProps = {
      marks: {
        ...marks,
      },
      defaultValue: Number(_.get(_.invert(marks),leverage)),
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
        boxShadow: '1px 1px 10px #CCCCCC',
        backgroundColor: COLORS.yellow
      },
      onChange: (v) => {
        this.setState({
          currentValue: marks[v]
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
            {
              !_.isEmpty(marks) ? <Slider {...marksProps} /> : null
            }
          </div >
          <div className={styles.down} >
            <ul >
              <li key={0} >
                <div >杠杆倍数</div >
                <div >起始保证金率</div >
                <div >维持保证金率</div >
              </li >
              {
                leverages.map((item, index) => {
                  const isMatch = (item = {}) => {
                    return currentValue && Number(currentValue) !== Number(leverage) && Number(item.leverage) === Number(currentValue)
                  }
                  return (
                    <li key={index + 1}
                        style={{ width: 630 / leverages.length }}
                        className={classNames(
                          isMatch(item) ? styles.ismatch : null
                        )} >
                      {
                        Number(item.leverage) === Number(leverage) ? (
                          <div className={styles.symbol} >
                            <div >
                              当前值
                            </div >
                            <img src={grayangle} />
                          </div >
                        ) : null
                      }
                      {
                        isMatch(item) ? (
                          <div className={styles.symbol} >
                            <div >
                              新值
                            </div >
                            <img src={activeangle} />
                          </div >
                        ) : null
                      }
                      <div className={styles.needli} >{item.leverage}</div >
                      <div className={styles.needli} >{item.initialMarginRateDisplay}</div >
                      <div className={styles.needli} >{keepBailRate}</div >
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
              closeModal()
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
                    leverage: String(currentValue)
                  }
                })
              }
              promise.then(res => {
                if (res) {
                  closeModal()
                  getLeverage()
                }
              })
            }}
          >
            <Button loading={loading.effects[`${modelName}/doUpdateLeverage`]} layer={false} >
              确定
            </Button >
          </div >
        </div >
      </MainModal >
    )
  }
}

