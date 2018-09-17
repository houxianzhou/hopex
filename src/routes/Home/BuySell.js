import React, { Component } from 'react'
import { Mixin, InputNumber, Slider, Button } from "@components"
import { COLORS } from '@constants'
import { classNames, _, isEqual } from '@utils'
import MainModal from '@routes/Components/MainModal'
import ScrollPannel from './components/ScrollPanel'
import styles from './index.less'


export default class BuySell extends Component {
  startInit = () => {
    this.getAllDetail()
  }

  getAllDetail = () => {
    this.getBuyDetail()
    this.getSellDetail()
  }

  getBuySellDetail = (payload = {}) => {
    const { dispatch, modelName, } = this.props
    return dispatch({
      type: `${modelName}/getBuySellDetail`,
      payload
    })
  }

  getBuyDetail = () => {
    const { price, amount } = this.state.buy
    const { model: { maxLimitPrice } } = this.props
    this.getBuySellDetail({
      price: this.isLimitPrice() ? price : Number(maxLimitPrice),
      amount,
      side: '2'
    }).then(res => {
      if (res) {
        const { marginDisplay, orderValueDisplay } = res
        const { buy } = this.state
        this.changeState({
          buy: {
            ...buy,
            marginDisplay,
            orderValueDisplay
          }
        })
      }
    })
  }

  getSellDetail = () => {
    const { price, amount } = this.state.sell
    const { model: { minLimitPrice } } = this.props
    this.getBuySellDetail({
      price: this.isLimitPrice() ? price : Number(minLimitPrice),
      amount,
      side: '1'
    }).then(res => {
      if (res) {
        const { marginDisplay, orderValueDisplay } = res
        const { sell } = this.state
        this.changeState({
          sell: {
            ...sell,
            marginDisplay,
            orderValueDisplay
          }
        })
      }
    })
  }

  postSideOrder = (obj = {}) => {
    const { side, price, amount } = obj
    const { dispatch, modelName } = this.props
    this.changeState({
      side
    })
    dispatch({
      type: `${modelName}/postSideOrder`,
      payload: {
        side,
        method: this.isLimitPrice() ? 'order.put_limit' : 'order.put_market',
        price: String(price),
        amount: String(amount)
      }
    })
  }

  state = {
    side: '',
    orderChannel: 0,// 限价还是市价
    buy: {
      marginDisplay: '', //保证金
      orderValueDisplay: '',//委托价值
      price: '',
      amount: '',
      ensureMoney: ''
    },
    sell: {
      marginDisplay: '', //保证金
      orderValueDisplay: '',//委托价值
      price: '',
      amount: '',
      ensureMoney: ''
    }
  }

  componentDidUpdate(prevProps) {
    const { model: { clickSelectOne: prevClickSelectOne } = {} } = prevProps
    const { model: { clickSelectOne } = {} } = this.props
    if (!isEqual(prevClickSelectOne, clickSelectOne) && clickSelectOne) {
      const { type, price, amount } = clickSelectOne
      if (type) {
        this.changeState({
          sell: {
            ...this.state.sell,
            price,
          },
          buy: {
            ...this.state.buy,
            price,
          }
        })
      }
    }
  }

  isLimitPrice = () => {
    const { orderChannel } = this.state
    return orderChannel === 0
  }

  renderInputItem = (config = {}) => {
    const { label_name, label_desc, intro_desc, intro_price, value, onChange, step, prec, max, min, placeHolder = '' } = config
    return (
      <div className={styles.priceitem} >
        <div className={styles.priceinput} >
          <div className={styles.label} >
            <div className={styles.label_name} >{label_name}</div >
            <div className={styles.label_desc} >{label_desc}</div >
          </div >
          {
            !placeHolder ? (
              <InputNumber className={styles.input_number} value={value} prec={prec} step={step} max={max} min={min}
                           onChange={onChange} />
            ) : (
              <div className={styles.input_number} >{placeHolder}</div >
            )
          }

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
    const { label_action, label_action_price, label_available, label_available_price, label_available_price_display } = config
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
      step: 0.1,
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
        {/*<Slider  {...props} />*/}
        <div className={styles.description} >
          <div >
            <span >{label_action}</span >
            <span >{label_action_price}</span ></div >
          <div >
            <span >{label_available}</span >
            <span >{label_available_price_display}</span >
          </div >
        </div >
      </div >
    )
  }

  renderSubmit = (config = {}) => {
    const {
      configSubmit: { label_text, label_desc, label_price, className = {}, onSubmit, loading } = {},
      configPrice: { value: valuePrice } = {},
      configAmount: { value: valueAmount } = {}
    } = config
    const { isLogin, routerGoLogin, routerGoRegister, model: { userAllowTrade, marketAllowTrade } } = this.props
    const { isLimitPrice } = this
    return <Button
      loading={loading}
      className={classNames(
        styles.submit,
        isLogin && (isLimitPrice() ? (Number(valuePrice) && Number(valueAmount)) : Number(valueAmount)) && userAllowTrade && marketAllowTrade ? styles.haslogin : styles.notlogin,
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
            <div >
              {routerGoLogin('登录')}
            </div >
            <div className={styles.center} >或</div >
            <div >
              {routerGoRegister('注册')}
            </div >
          </>
        )
      }
    </Button >
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
    const { renderArea, changeState, isLimitPrice, getBuyDetail, getSellDetail, postSideOrder } = this
    const {
      dispatch, loading, modelName, RG, model: {
        minVaryPrice = '', minPricePrecision = 0, minPriceMovementDisplay = '', minDealAmount = '',
        minDealAmountDisplay = '', maxLimitPrice = '', minLimitPrice = '', availableMoney = '', availableMoneyDisplay,
      },
      modal: {
        name, data
      }
        = {}, openModal, isLogin
    }
      = this.props
    const { side, buy, sell } = this.state


    // 限价或者市价
    const configPrice = {
      label_name: isLimitPrice() ? '限价' : '市价',
      label_desc: `最小单位${minPriceMovementDisplay}`,
      intro_desc: '最高允许买价',
      intro_price: maxLimitPrice,
      placeHolder: isLimitPrice() ? '' : '市价',
      value: isLimitPrice() ? buy.price : '',
      prec: minPricePrecision,
      step: minVaryPrice,
      min: 0,
      onChange: (value) => {
        changeState({
          buy: {
            ...buy,
            price: value
          }
        }, getBuyDetail)
      }
    }
    // 数量
    const configAmount = {
      label_name: '数量',
      label_desc: `最小单位${minDealAmountDisplay}`,
      value: buy.amount,
      min: 0,
      onChange: (value) => {
        changeState({
          buy: {
            ...buy,
            amount: value
          }
        }, getBuyDetail)
      },
      step: minDealAmount
    }
    // 保证金
    const configEnsure = {
      label_action: '预估占用保证金',
      label_action_price: buy.marginDisplay,
      label_available: '可用金额',
      label_available_price: Number(availableMoney),
      label_available_price_display: availableMoneyDisplay
    }
    // 交易按钮
    const configSubmit = {
      loading: side === '2' && loading.effects[`${modelName}/postSideOrder`],
      label_text: '买入',
      label_desc: '委托价值',
      label_price: buy.orderValueDisplay,
      className: RG ? styles.buy : styles.sell,
      onSubmit: () => {
        if (isLimitPrice() && Number(buy.price) > Number(maxLimitPrice)) {
          openModal({
            name: 'priceWarn',
            data: {
              side: 2,
              price: maxLimitPrice,
              amount: String(buy.amount)
            }
          })
        } else {
          postSideOrder({
            side: '2',
            price: String(buy.price),
            amount: String(buy.amount)
          })
        }
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
          intro_price: minLimitPrice,
          value: isLimitPrice() ? sell.price : '',
          step: minVaryPrice,
          min: 0,
          onChange: (value) => {
            changeState({
              sell: {
                ...sell,
                price: value
              }
            }, getSellDetail)
          }
        }
      },
      configAmount: {
        ...configAmount,
        ...{
          value: sell.amount,
          onChange: (value) => {
            changeState({
              sell: {
                ...sell,
                amount: value
              }
            }, getSellDetail)
          }
        }
      },
      configEnsure: {
        ...configEnsure,
        ...{
          label_action_price: sell.marginDisplay,
        }
      },
      configSubmit: {
        ...configSubmit,
        ...{
          loading: side === '1' && loading.effects[`${modelName}/postSideOrder`],
          label_text: '卖出',
          label_price: sell.orderValueDisplay,
          className: RG ? styles.sell : styles.buy,
          onSubmit: () => {
            if (isLimitPrice() && Number(sell.price) < Number(minLimitPrice)) {
              openModal({
                name: 'priceWarn',
                data: {
                  side: 1,
                  price: minLimitPrice,
                  amount: String(sell.amount)
                }
              })
            } else {
              postSideOrder({
                side: '1',
                price: String(sell.price),
                amount: String(sell.amount)
              })
            }
          }
        }
      }
    }
    return (
      <Mixin.Child that={this} >
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
              <div className={styles.buysellheader} >
                <ul className={classNames(
                  styles.buyselltab
                )} >
                  <li
                    className={classNames(
                      isLimitPrice() ? styles.active : null
                    )}
                    onClick={() => {
                      changeState({
                        orderChannel: 0,
                      }, () => {
                        this.getAllDetail()
                      })
                    }}
                  >
                    限价
                  </li >
                  <li
                    className={classNames(
                      !isLimitPrice() ? styles.active : null
                    )}
                    onClick={() => {
                      changeState({
                        orderChannel: 1,
                      }, () => {
                        this.getAllDetail()
                      })
                    }}
                  >
                    市价
                  </li >
                </ul >
                <ul className={styles.right} >
                  {/*<li >计算器</li >*/}
                  {
                    isLogin ? (
                      <li onClick={
                        () => {
                          openModal({ name: 'fee' })
                        }
                      } >
                        费用
                      </li >
                    ) : null
                  }
                </ul >
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
        {
          name === 'fee' ? (<RenderModal {...this.props} {...this.state}  />) : null
        }
        {
          name === 'priceWarn' ? (<RenderModal2 {...this.props} postSideOrder={postSideOrder} />) : null
        }
        {
          name === 'calculator' ? (<RenderModal3 {...this.props}  />) : null
        }
      </Mixin.Child >
    )
  }
}

class RenderModal extends Component {
  state = {
    fee: {}
  }

  changeState = (payload) => {
    this.setState(payload)
  }

  componentDidMount() {
    const { dispatch, modelName } = this.props
    dispatch({
      type: `${modelName}/getMarketFee`
    }).then(res => {
      if (res) {
        this.changeState({
          fee: res
        })
      }
    })
  }

  render() {
    const { model: { marketName }, } = this.props
    const {
      fee: {
        makerFeeRateDisplay = '', takerFeeRateDisplay = '',
        liquidationFeeRateDisplay = '', deliveryRateDisplay = ''
      } = {}
    } = this.state
    const props = {
      ...this.props,
      title: marketName
    }
    return (
      <MainModal {...props} className={styles.buySellFee_Modal} >
        <ul >
          <li >
            <div >流动性提供方(挂单)手续费率:</div >
            <div >{makerFeeRateDisplay}</div >
          </li >
          <li >
            <div >流动性提供方(吃单)手续费率:</div >
            <div >{takerFeeRateDisplay}</div >
          </li >
          <li >
            <div >强平手续费率:</div >
            <div >{liquidationFeeRateDisplay}</div >
          </li >
        </ul >
      </MainModal >
    )
  }
}

class RenderModal2 extends Component {
  render() {
    const props = {
      ...this.props
    }
    const { closeModal, modal: { data: { side, price, amount } = {} }, postSideOrder } = this.props
    return (
      <MainModal {...props} className={styles.priceWarn_Modal} >
        <div >
          <div className={styles.content} >
            您的下单价格已超出价格限制范围，请确认以目前允许的
            {
              String(side) === '2' ? '最高买入' : '最低卖出'
            }
            价格<span className={styles.warnprice}>{price}</span >下单
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
                closeModal()
                postSideOrder({
                  side: String(side),
                  price: price,
                  amount: amount
                })
              }}
            >
              <Button >
                确定
              </Button >

            </div >
          </div >
        </div >

      </MainModal >
    )
  }
}

class RenderModal3 extends Component {
  state = {
    active: 0,
  }

  changeState = (payload) => {
    this.setState(payload)
  }

  render() {
    const { active } = this.state
    const props = {
      title: '计算器',
      ...this.props
    }
    const { closeModal } = this.props
    const { changeState } = this
    const lis = [
      { name: '收益' },
      { name: '平仓价格' },
      { name: '强平价格' }
    ]
    return (
      <MainModal {...props} className={styles.calculator_modal} >
        <div className={styles.header} >
          <ul >
            {
              lis.map((item, index) => (
                <li >
                  <div
                    className={classNames(
                      active === index ? styles.active : null
                    )}
                    onClick={() => {
                      changeState({
                        active: index
                      })
                    }} >
                    {item.name}
                  </div >
                </li >
              ))
            }
          </ul >
        </div >
        <div className={styles.content} >

        </div >

      </MainModal >
    )
  }
}

