import React, { Component } from 'react'
import { InputNumber, Slider } from "@components"
import { COLORS } from '@constants'
import { classNames, _, formatNumber } from '@utils'
import ScrollPannel from './components/ScrollPanel'
import styles from './index.less'


export default class View extends Component {
  state = {
    orderChannel: 'order.put_limit',
    buy: {
      price: '',
      amount: '',
      ensureMoney: ''
    },
    sell: {
      price: '',
      amount: '',
      ensureMoney: ''
    }
  }

  changeState = (payload) => {
    this.setState(payload)
  }

  renderInputItem = (config = {}) => {
    const { label_name, label_desc, intro_desc, intro_price, value, onChange, step } = config
    return (
      <div className={styles.priceitem} >
        <div className={styles.priceinput} >
          <div className={styles.label} >
            <div className={styles.label_name} >{label_name}</div >
            <div className={styles.label_desc} >{label_desc}</div >
          </div >
          <InputNumber className={styles.input_number} value={value} step={step} onChange={onChange} />
        </div >
        {
          intro_desc && intro_price ? (
            <div className={styles.introduction} >
              <div className={styles.introduction_desc} >{intro_desc}</div >
              <div className={styles.introduction_price} >{intro_price}</div >
            </div >
          ) : null
        }

      </div >
    )
  }

  renderEnsureMoney = (config = {}) => {
    const { isLogin } = this.props
    const { label_buy, label_buy_price, label_sell, label_sell_price } = config
    const marks = {
      0: '',
      2000: '',
      4000: '',
      6000: '',
      10000: '',
    }
    const props = {
      marks: marks,
      max: 10000,
      defaultValue: 1,
      step: 1,
      included: true,
      disabled: isLogin ? false : true,
      dotStyle: {
        marginLeft: 'unset',
        backgroundColor: 'rgba(53,61,79,1)',
        border: 'none',
        bottom: '-1px',
      },
      railStyle: {
        height: '3px',
        backgroundColor: 'rgba(53,61,79,1)',
      },
      handleStyle: {
        display: isLogin ? '' : 'none',
        marginTop: '-6px',
        marginLeft: '-3px',
        width: '14px',
        height: '14px',
        border: `solid 4px ${COLORS.yellow}`,
        backgroundColor: 'white'
      },
      trackStyle: {
        height: '3px',
        width: '100px',
        backgroundColor: COLORS.yellow
      },
      activeDotStyle: {
        backgroundColor: isLogin ? COLORS.yellow : 'rgba(53,61,79,1)'
      }
    }
    return (
      <div className={styles.ensuremoney} >
        <Slider  {...props} />
        <div className={styles.description} >
          <div >
            <span >{label_buy}</span >
            <span >{label_buy_price}</span ></div >
          <div >
            <span >{label_sell}</span >
            <span >{label_sell_price}</span >
          </div >
        </div >
      </div >
    )
  }

  renderSubmit = (config = {}) => {
    const { label_text, label_desc, label_price, className = {}, onSubmit } = config
    const { isLogin, routerGoLogin, routerGoRegister } = this.props
    return <div
      className={classNames(
        styles.submit,
        isLogin ? styles.haslogin : styles.notlogin,
        className
      )}
      onClick={() => {
        if (_.isFunction(onSubmit)) onSubmit()
      }}
    >
      {
        isLogin ? (
          <>
            <span className={styles.text} >
        {
          label_text
        }
      </span >
            <span >
        {
          label_desc
        }
      </span >
            <span >
        {
          label_price
        }
      </span >
          </>
        ) : (
          <>
            <div onClick={() => {
              routerGoLogin()
            }} >登录
            </div >
            <div className={styles.center} >或</div >
            <div onClick={() => {
              routerGoRegister()
            }} >注册
            </div >
          </>
        )
      }

    </div >
  }

  renderArea = (config = {}) => {
    const { configPrice = {}, configAmount = {}, configEnsure = {}, configSubmit = {}, ...rest } = config
    return (
      <div style={{}} className={styles.area} >
        {
          this.renderInputItem({ ...configPrice, ...rest })
        }
        {
          this.renderInputItem({ ...configAmount, ...rest })
        }
        {
          this.renderEnsureMoney({ ...configEnsure, ...rest })
        }
        {
          this.renderSubmit({ ...configSubmit, ...rest })
        }
      </div >
    )
  }

  render() {
    const { renderArea } = this
    const { dispatch, modelName, model: { minVaryPrice = '', minDealAmount = '' } } = this.props
    const { orderChannel, buy, sell } = this.state

    // 限价或者市价
    const configPrice = {
      label_name: orderChannel === 'order.put_limit' ? '限价' : '市价',
      label_desc: `最小单位${formatNumber(minVaryPrice, 2)}USD`,
      intro_desc: '最高允许买价',
      intro_price: '10000.0',
      value: buy.price,
      onChange: (value) => {
        this.setState({
          buy: {
            ...buy,
            price: value
          }
        })
      },
      step: minVaryPrice
    }
    // 数量
    const configAmount = {
      label_name: '数量',
      label_desc: `最小单位${formatNumber(minDealAmount, 2)}张`,
      value: buy.amount,
      onChange: (value) => {
        this.setState({
          buy: {
            ...buy,
            amount: value
          }
        })
      },
      step: minDealAmount
    }
    // 保证金
    const configEnsure = {
      label_buy: '买入保证金',
      label_buy_price: '1000',
      label_sell: '可用金额',
      label_sell_price: '1000.0'
    }
    // 交易按钮
    const configSubmit = {
      label_text: '买入',
      label_desc: '委托价值',
      label_price: '100.BTC',
      className: styles.buy,
      onSubmit: () => {
        console.log('买入')
        dispatch({
          type: `${modelName}/postSideOrder`,
          payload: {
            side: '2',
            method: this.state.orderChannel,
            price: buy.price,
            amount: buy.amount
          }
        })
      }
    }
    const configBuy = {
      name: 'buy',
      configPrice,
      configAmount,
      configEnsure,
      configSubmit
    }
    const configSell = {
      name: 'sell',
      configPrice: {
        ...configPrice,
        ...{
          intro_desc: '最低允许卖价',
          value: sell.price,
          onChange: (value) => {
            this.setState({
              sell: {
                ...sell,
                price: value
              }
            })
          }

        }
      },
      configAmount: {
        ...configAmount,
        ...{
          value: sell.amount,
          onChange: (value) => {
            this.setState({
              sell: {
                ...sell,
                amount: value
              }
            })
          }
        }
      },
      configEnsure: {
        ...configEnsure,
        ...{
          label_buy: '卖出保证金',
        }
      },
      configSubmit: {
        ...configSubmit,
        ...{
          label_text: '卖出',
          className: styles.sell,
          onSubmit: () => {
            dispatch({
              type: `${modelName}/postSideOrder`,
              payload: {
                side: '1',
                method: this.state.orderChannel,
                price: sell.price,
                amount: sell.amount
              }
            })
          }
        }
      }
    }
    return (
      <div
        className={
          classNames(
            {
              view: true
            },
            styles.buySell
          )
        }
      >
        <ScrollPannel
          scroller={false}
          header={
            <div >
              <span
                style={{
                  color: this.state.orderChannel === 'order.put_limit' ? 'green' : null
                }}
                onClick={() => {
                  this.changeState({
                    orderChannel: 'order.put_limit',
                  })
                }}
              >
                现价
              </span >
              <span
                style={{
                  marginLeft: 5,
                  color: this.state.orderChannel === 'order.put_market' ? 'green' : null
                }}
                onClick={() => {
                  this.changeState({
                    orderChannel: 'order.put_market',
                  })
                }}
              >
                市价
              </span >
            </div >
          }
        >
          <div className={styles.content} >
            {
              renderArea(configBuy)
            }
            {
              renderArea(configSell)
            }
          </div >
        </ScrollPannel >
      </div >
    )
  }
}

