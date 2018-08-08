import React, { Component } from 'react'
import { InputNumber, Slider } from "@components"
import { COLORS } from '@constants'
import { classNames, _, formatNumber, isEqual } from '@utils'
import ScrollPannel from './components/ScrollPanel'
import styles from './index.less'


export default class View extends Component {
  state = {
    orderChannel: 0,
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

  componentDidUpdate(prevProps) {
    const { model: { clickSelectOne: prevClickSelectOne } = {} } = prevProps
    const { model: { clickSelectOne } = {} } = this.props
    if (!isEqual(prevClickSelectOne, clickSelectOne) && clickSelectOne) {
      let order = null
      const { type, price, amount } = clickSelectOne
      if (type) {
        order = type === '1' ? 'sell' : 'buy'
        this.changeState({
          [order]: {
            ...this.state[order],
            price,
            amount
          }
        })
      }
    }
  }

  changeState = (payload) => {
    this.setState(payload)
  }

  renderInputItem = (config = {}) => {
    const { label_name, label_desc, intro_desc, intro_price, value, onChange, step, max, min } = config
    return (
      <div className={styles.priceitem} >
        <div className={styles.priceinput} >
          <div className={styles.label} >
            <div className={styles.label_name} >{label_name}</div >
            <div className={styles.label_desc} >{label_desc}</div >
          </div >
          <InputNumber className={styles.input_number} value={value} step={step} max={max} min={min}
                       onChange={onChange} />
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
    const { isLogin, } = this.props
    const { label_action, label_action_price, label_available, label_available_price } = config
    const p1 = label_available_price * 0.25 || 0
    const marks = {
      0: '',
      [label_available_price * 0.25]: '',
      [label_available_price * 0.5]: '',
      [label_available_price * 0.75]: '',
      [label_available_price]: '',
    }
    const props = {
      marks: marks,
      max: label_available_price,
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
            <span >{label_action}</span >
            <span >{label_action_price}</span ></div >
          <div >
            <span >{label_available}</span >
            <span >{label_available_price}</span >
          </div >
        </div >
      </div >
    )
  }

  renderSubmit = (config = {}) => {
    const {
      configSubmit: { label_text, label_desc, label_price, className = {}, onSubmit } = {},
      configPrice: { value: valuePrice } = {},
      configAmount: { value: valueAmount } = {}

    } = config
    const { isLogin, routerGoLogin, routerGoRegister } = this.props
    return <div
      className={classNames(
        styles.submit,
        isLogin && valuePrice && valueAmount ? styles.haslogin : styles.notlogin,
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
          this.renderSubmit(config)
        }
      </div >
    )
  }

  render() {
    const { renderArea } = this
    const { dispatch, modelName, RG, model: { minVaryPrice = '', minDealAmount = '', maxLimitPrice = '', minLimitPrice = '', availableMoney = '' } } = this.props
    const { orderChannel, buy, sell } = this.state

    // 限价或者市价
    const configPrice = {
      label_name: orderChannel === 0 ? '限价' : '市价',
      label_desc: `最小单位${formatNumber(minVaryPrice, 2)}USD`,
      intro_desc: '最高允许买价',
      intro_price: formatNumber(maxLimitPrice, 'p'),
      value: buy.price,
      step: minVaryPrice,
      min: 0,
      max: formatNumber(maxLimitPrice, 'p'),

      onChange: (value) => {
        this.setState({
          buy: {
            ...buy,
            price: value
          }
        })
      },

    }
    // 数量
    const configAmount = {
      label_name: '数量',
      label_desc: `最小单位${formatNumber(minDealAmount, 2)}张`,
      value: buy.amount,
      min: 0,
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
      label_action: '买入保证金',
      label_action_price: '1000',
      label_available: '可用金额',
      label_available_price: Number(availableMoney)
    }
    // 交易按钮
    const configSubmit = {
      label_text: '买入',
      label_desc: '委托价值',
      label_price: '100.BTC',
      className: RG ? styles.buy : styles.sell,
      onSubmit: () => {
        console.log('买入')
        dispatch({
          type: `${modelName}/postSideOrder`,
          payload: {
            side: '2',
            method: orderChannel === 0 ? 'order.put_limit' : 'order.put_market',
            price: String(buy.price),
            amount: String(buy.amount)
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
          intro_price: formatNumber(minLimitPrice, 'p'),
          value: sell.price,
          max: formatNumber(minLimitPrice, 'p'),
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
          label_action: '卖出保证金',
        }
      },
      configSubmit: {
        ...configSubmit,
        ...{
          label_text: '卖出',
          className: RG ? styles.sell : styles.buy,
          onSubmit: () => {
            dispatch({
              type: `${modelName}/postSideOrder`,
              payload: {
                side: '1',
                method: orderChannel === 0 ? 'order.put_limit' : 'order.put_market',
                price: String(sell.price),
                amount: String(sell.amount)
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
            <ul className={classNames(
              styles.tab,
              styles.buyselltab
            )} >
              <li
                className={classNames(
                  orderChannel === 0 ? 'active' : null
                )}
                onClick={() => {
                  this.changeState({
                    orderChannel: 0,
                  })
                }}
              >
                现价
              </li >
              <li
                className={classNames(
                  orderChannel === 1 ? 'active' : null
                )}
                onClick={() => {
                  this.changeState({
                    orderChannel: 1,
                  })
                }}
              >
                市价
              </li >
            </ul >
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

