import React, { Component } from 'react'
import { connect } from 'dva'
import { PATH } from "@constants"
import { Mixin, Button, Table, Toast, RouterGo } from '@components'
import { classNames, _, Patterns, isEqual, formatNumber } from '@utils'
import MoneySelect from '@routes/Asset/components/MoneySelect'
import Input from '@routes/Components/Input'
import MainModal from '@routes/Components/MainModal'
import { getColumns } from '@routes/Components/LegalAssetRecordTable'
import { default as SuperVertifyForm } from '@routes/Components/SuperVertifyForm'
import GoogleCodeOpenModal from '@routes/Components/GoogleCodeOpenModal'
import GoogleCodeVertify from '@routes/Components/GoogleCodeVertify'

import styles from '@routes/Asset/index.less'

@connect(({ modal, asset, user, Loading, account }) => ({
  user,
  model: asset,
  modal,
  account,
  loading: Loading
}))
export default class View extends Component {
  constructor(props) {
    super(props)
    const { model: { detailLegal } } = this.props
    this.state = {
      active: detailLegal[0].assetName,
      buy_rmbAmount: '',
      buy_rmbAmount_errMsg: '',
      sell_rmbAmount: '',
      sell_rmbAmount_errMsg: '',
      emailVerificationCod: '',
      googleCode: '',
      page: 1,
      pageSize: 10,
      record: []
    }
  }

  componentDidMount() {
    this.startInit()
  }

  changeMoney = (payload) => {
    this.changeState({
        active: payload,
        buy_rmbAmount: '',
        buy_rmbAmount_errMsg: '',
        sell_rmbAmount: '',
        sell_rmbAmount_errMsg: '',
      },
      () => {
        this.startInit()
      }
    )
  }

  startInit = () => {
    this.doBuy()
    this.doSell()
  }

  componentDidUpdate(prevProps) {
    const { model: { buyPage: prevBuyPage } } = prevProps
    const { model: { buyPage, detailLegal = [] } } = this.props
    if (!isEqual(prevBuyPage, buyPage) && buyPage) {
      this.changeState({
        active: detailLegal[0].assetName
      }, () => {
        if (buyPage === 1) {
          this.doBuy()
        } else if (buyPage === 2) {
          this.doSell()
        }
      })
    }
  }

  doBuy = () => {
    this.getExchangeRate('BUY')
    this.getBuyParameter()
    this.getOrder()
  }

  doSell = () => {
    this.getExchangeRate('SELL')
    this.getSellParameter()
    this.getOrder()
  }

  getBuyParameter = () => {
    const { dispatch, modelName } = this.props
    const { active, } = this.state
    dispatch({
      type: `${modelName}/getBuyParameter`,
      payload: {
        coinCode: active,
      }
    })
  }

  getSellParameter = () => {
    const { dispatch, modelName } = this.props
    const { active, } = this.state
    dispatch({
      type: `${modelName}/getSellParameter`,
      payload: {
        coinCode: active,
      }
    })
  }

  getExchangeRate = (priceArrow) => {
    const { dispatch, modelName } = this.props
    const { active, } = this.state
    dispatch({
      type: `${modelName}/getExchangeRate`,
      payload: {
        coinCode: active,
        priceArrow
      }
    })
  }

  getOrder = () => {
    const { dispatch, modelName } = this.props
    const { page, pageSize } = this.state
    dispatch({
      type: `${modelName}/getOrder`,
      payload: {
        page,
        limit: pageSize
      }
    }).then(res => {
      if (res) {
        this.changeState({
          record: res
        })
      }
    })
  }

  checkAllConditions = (type, selectOne = {}) => {
    const { openModal, dispatch, } = this.props
    let result = false
    const {
      hasOpenBuyOrder, forbidden, allowLegalBuy, idCardVerified,
      sell_forbidden, sell_allowLegalSell, sell_idCardVerified, sell_bankVerified,
      sell_changePwdIn24h, sell_disabledTwoFactoriesIn24h, sell_enableTwoFactories

    } = selectOne
    if (type === 'buy') {
      if (hasOpenBuyOrder) {
        return openModal({
          name: 'hasOpenOrder',
          data: 'buy'
        })
      } else if (forbidden) {
        return Toast.tip('账户被禁用')
      } else if (!allowLegalBuy) {
        return Toast.tip('账户不允许法币买入数字货币')
      } else if (!idCardVerified) {
        dispatch({
          type: `account/changeState`,
          payload: {
            superVertifyPage: 4
          }
        })
        return openModal({
          name: 'idCardVertify'
        })
      }

    } else {
      if (sell_forbidden) {
        return Toast.tip('账户被禁用')
      } else if (!sell_allowLegalSell) {
        return Toast.tip('账户不允许法币卖出数字货币')
      } else if (!sell_idCardVerified) {
        dispatch({
          type: `account/changeState`,
          payload: {
            superVertifyPage: 4
          }
        })
        return openModal({
          name: 'idCardVertify',
          data: 'sell'
        })
      } else if (!sell_bankVerified) {
        dispatch({
          type: `account/changeState`,
          payload: {
            superVertifyPage: 5
          }
        })
        return openModal({
          name: 'idCardVertify',
          data: 'sell'
        })
      } else if (sell_changePwdIn24h) {
        return Toast.tip('修改登录密码后24小时内不能卖出数字货币')
      } else if (sell_disabledTwoFactoriesIn24h) {
        return Toast.tip('关闭谷歌验证后24小时内不能卖出数字货币')
      } else if (!sell_enableTwoFactories) {
        return openModal({
          name: 'googleCodeOpen',
        })
      }
    }
    return true
  }

  buyOTC = () => {
    const { dispatch, modelName, } = this.props
    const { active, buy_rmbAmount } = this.state
    dispatch({
      type: `${modelName}/buyOTC`,
      payload: {
        coinCode: active,
        rmbAmount: buy_rmbAmount,
        returnUrl: window.location.href
      }
    })
  }

  BeforesellOTCSendMail = (selectOne = {}) => {
    const { dispatch, modelName, openModal, user: { userInfo: { email = '' } = {} } = {}, } = this.props
    const { sell_realName, sell_bankName, sell_bankNo } = selectOne
    const { sell_rmbAmount, active } = this.state
    dispatch({
      type: `${modelName}/BeforesellOTCSendMail`,
      payload: {
        email,
        coinCode: active,
        amount: sell_rmbAmount,
        rmbAmount: formatNumber(sell_rmbAmount * selectOne.sell_exchangeRate, 8),
        realName: sell_realName,
        bankName: sell_bankName,
        bankNo: sell_bankNo
      }
    }).then(res => {
      if (res) {
        openModal({
          name: 'googleCodeVertify',
        })
      }
    })
  }

  sellOTC = () => {
    const { dispatch, modelName, user: { userInfo: { email = '' } = {} } = {}, closeModal } = this.props
    const { active, sell_rmbAmount, emailVerificationCode = '', googleCode = '', } = this.state
    dispatch({
      type: `${modelName}/sellOTC`,
      payload: {
        email,
        emailVerificationCode,
        googleCode,
        coinCode: active,
        amount: sell_rmbAmount,
      }
    }).then(res => {
      this.startInit()
      if (res) {
        closeModal()
      }
    })
  }

  doCheckBuy = (value, selectOne) => {
    const { changeState } = this
    if (Patterns.decimalNumber.test(value)) {
      if (value < Number(selectOne.minBuyRMB)) {
        changeState({
          buy_rmbAmount_errMsg: `最小单次买入金额${selectOne.minBuyRMB}人民币`
        })
      } else if (value > Number(selectOne.maxBuyRMB)) {
        changeState({
          buy_rmbAmount_errMsg: `最大单次买入金额${selectOne.maxBuyRMB}人民币`
        })
      } else {
        changeState({
          buy_rmbAmount_errMsg: ''
        })
      }
    } else {
      changeState({
        buy_rmbAmount_errMsg: ''
      })
    }
  }

  doCheckSell = (value, selectOne) => {
    const { changeState } = this
    if (Patterns.decimalNumber.test(value)) {
      if (value < Number(selectOne.sell_minSellAmount)) {
        changeState({
          sell_rmbAmount_errMsg: `最小单次卖出数量${selectOne.sell_minSellAmount}${selectOne.assetName}`
        })
      } else if (value > Number(selectOne.sell_maxSellAmount)) {
        changeState({
          sell_rmbAmount_errMsg: `可卖出金额不足`
        })
      } else {
        changeState({
          sell_rmbAmount_errMsg: ''
        })
      }
    } else {
      changeState({
        sell_rmbAmount_errMsg: ''
      })
    }
  }


  render() {
    const { startInit, changeState, buyOTC, sellOTC, BeforesellOTCSendMail, checkAllConditions, doCheckBuy, doCheckSell, } = this
    const {
      modal: { name, data },
      model: { detailLegal = [], buyPage },
      theme: { calculateTableHeight }, loading, modelName
    } = this.props
    const { active, buy_rmbAmount, buy_rmbAmount_errMsg, sell_rmbAmount, sell_rmbAmount_errMsg, record, } = this.state
    const selectList = detailLegal.map((item = {}) => ({ label: item.assetName, value: item.assetName }))
    const selectItem = selectList.filter((item = {}) => item.label === active)[0]
    const selectOne = detailLegal.filter((item = {}) => item.assetName === active)[0]
    const isNotAllow = () => {
      return selectOne.allowWithdraw === false || selectOne.isValid === false
    }
    const columns = getColumns()
    const dataSource = record
    const tableProp = {
      loading: loading.effects[`${modelName}/getAssetRecord`],
      className: styles.tableContainer,
      columns,
      dataSource: dataSource,
    }
    return (
      <Mixin.Child that={this} >
        <div className={styles.buy} >
          {
            buyPage == 1 ? (
              <div className={styles.page1} >
                <div className={styles.title} >买入数字货币</div >
                <div className={styles.desc} >
                  <ul >
                    {
                      (selectOne.remarks || []).map((item = '', index) => {
                        return <li key={index} >{item}</li >
                      })
                    }
                  </ul >
                </div >
                <div className={styles.moneytype} >
                  币种
                  <div className={styles.select} >
                    <MoneySelect
                      onChange={(option = {}) => {
                        this.changeMoney(option.value)
                      }}
                      value={selectItem}
                      options={selectList}
                    />
                  </div >
                </div >
                <ul className={styles.userinput} >
                  <li >
                    <div className={styles.label} >实名认证</div >
                    <div >
                      {selectOne.realName}
                    </div >
                  </li >
                  <li >
                    <div className={styles.label} >汇率</div >
                    <div >
                      1{active} ≈ {selectOne.exchangeRateDisplay} 人民币
                    </div >
                  </li >

                  <li >
                    <div className={styles.label} >我要买</div >
                    <div className={styles.input} >
                      <Input
                        placeholder={''}
                        value={buy_rmbAmount}
                        errorMsg={buy_rmbAmount_errMsg}
                        onCheck={(value) => {
                          doCheckBuy(value, selectOne)
                        }}
                        onChange={(value) => {
                          if (Patterns.decimalNumber.test(value) || value === '') {
                            changeState({ buy_rmbAmount: value })
                          }
                        }} >
                      </Input >
                    </div >
                    <span
                      className={styles.exchange} >人民币 ≈ {formatNumber(buy_rmbAmount / selectOne.exchangeRate, 8)} {active}
                    </span >
                  </li >
                  <li className={styles.inputbutton} >
                    <div className={styles.label} ></div >
                    <div className={
                      classNames(
                        styles.button,
                        buy_rmbAmount && !buy_rmbAmount_errMsg ? styles.permit : null
                      )
                    } >
                      <Button
                        loading={loading.effects[`${modelName}/buyOTC`]}
                        onClick={() => {
                          if (checkAllConditions('buy', selectOne)) {
                            buyOTC()
                          }
                        }} >
                        去支付
                      </Button >
                    </div >
                  </li >
                </ul >
              </div >
            ) : null
          }

          {
            buyPage == 2 ? (
              <div className={styles.page1} >
                <div className={styles.title} >卖出数字货币</div >
                <div className={styles.desc} >
                  <ul >
                    {
                      (selectOne.sell_remarks || []).map((item = '', index) => {
                        return <li key={index} >{item}</li >
                      })
                    }
                  </ul >
                </div >
                <div className={styles.moneytype} >
                  币种
                  <div className={styles.select} >
                    <MoneySelect
                      onChange={(option = {}) => {
                        this.changeMoney(option.value)
                      }}
                      value={selectItem}
                      options={selectList}
                    />
                  </div >
                </div >
                <ul className={styles.userinput} >
                  <li >
                    <div className={styles.label} >银行卡</div >
                    <div >
                      {selectOne.sell_realName}<span >{selectOne.sell_bankNo}</span >
                    </div >
                  </li >
                  <li >
                    <div className={styles.label} >汇率</div >
                    <div >
                      1{active} ≈ {selectOne.sell_exchangeRateDisplay} 人民币
                    </div >
                  </li >

                  <li >
                    <div className={styles.label} >我要卖</div >
                    <div className={styles.input} >
                      <Input
                        placeholder={''}
                        value={sell_rmbAmount}
                        errorMsg={sell_rmbAmount_errMsg}
                        onCheck={(value) => {
                          doCheckSell(value, selectOne)
                        }}
                        onChange={(value) => {
                          if (Patterns.decimalNumber.test(value) || value === '') {
                            changeState({ sell_rmbAmount: value })
                          }
                        }} >
                      </Input >

                    </div >
                    <span
                      className={styles.exchange} >{active} ≈ {formatNumber(sell_rmbAmount * selectOne.sell_exchangeRate, 2)} 人民币
                    </span >
                  </li >
                  <li className={styles.maxwidthdrawcontainer} >
                    <div className={styles.label} ></div >
                    <div className={styles.maxwidthdraw} >
                      <div >最大可提现金额 :{selectOne.sell_maxSellAmount}{active}</div >
                      <div className={styles.sellall} onClick={() => {
                        changeState({ sell_rmbAmount: selectOne.sell_maxSellAmount }, () => {
                          doCheckSell(selectOne.sell_maxSellAmount, selectOne)
                        })
                      }} >全部卖出
                      </div >
                    </div >
                  </li >
                  <li className={styles.inputbutton} >
                    <div className={styles.label} ></div >
                    <div className={
                      classNames(
                        styles.button,
                        sell_rmbAmount && !sell_rmbAmount_errMsg ? styles.permit : null
                      )
                    } >
                      <Button
                        loading={loading.effects[`${modelName}/BeforesellOTCSendMail`]}
                        onClick={() => {
                          if (checkAllConditions('sell', selectOne)) {
                            BeforesellOTCSendMail(selectOne)
                          }
                        }} >
                        卖出
                      </Button >
                    </div >
                  </li >
                </ul >
              </div >
            ) : null
          }

          <div className={styles.tableheader} >
            <div >最近10条资金记录</div >
            <div >
              <RouterGo.SwitchRoute Ele={'span'} value={{
                pathname: PATH.asset,
                search: `?page=Record_Legal`
              }} >
                完整资金记录
              </RouterGo.SwitchRoute >
            </div >
          </div >
          <div style={{ height: calculateTableHeight(dataSource) }} ><Table {...tableProp} /></div >
          {
            name === 'hasOpenOrder' ? <RenderModal1 {...this.props} /> : null
          }
          {
            name === 'idCardVertify' ?
              <RenderModal2 {...this.props} startInit={startInit} selectOne={selectOne} data={data} /> : null
          }
          {
            name === 'googleCodeOpen' ? <GoogleCodeOpenModal {...this.props} /> : null
          }
          {
            name === 'googleCodeVertify' ?
              <RenderModal3 {...this.props} {...this.state} {...this} /> : null
          }
        </div >
      </Mixin.Child >
    )
  }
}

//有未完成的订单
class RenderModal1 extends Component {
  render() {
    const props = {
      ...this.props
    }
    const { closeModal, } = this.props
    return (
      <MainModal {...props}  >
        <div className={styles.googleCodeOpen_Modal} >
          <div className={styles.content} >
            有未完成的订单，不能发起新的订单
          </div >
          <div className={styles.buttons} >

            <div
              onClick={() => {
                closeModal()
              }}
              className={styles.cancel}
            >
              取消
            </div >
            <div
              className={styles.confirm}
              onClick={() => {
                closeModal()
              }}
            >
              <Button >
                查看
              </Button >
            </div >
          </div >
        </div >
      </MainModal >
    )
  }
}

//实名认证
class RenderModal2 extends Component {
  render() {
    const { startInit, selectOne = {}, data, dispatch, account: { superVertifyPage } } = this.props
    const props = {
      modalProps: {
        style: {
          width: 900,
        },
      },
      ...this.props
    }
    const superVertifyFormProps = {
      vertifyIdCardCallBack: (res) => {
        if (res) {
          startInit()
          if (data === 'sell' && !selectOne.sell_bankVerified) {
            dispatch({
              type: `account/changeState`,
              payload: {
                superVertifyPage: 5
              }
            })
          } else {
            closeModal()
          }
        }
      },
      vertifyBankCallBack: (res) => {
        if (res) {
          startInit()
          closeModal()
        }
      }
    }
    const { closeModal, } = this.props
    return (
      <MainModal {...props}
                 title={superVertifyPage === 4 ? '实名认证' : '银行卡绑定'} >
        <div className={styles.idCardVertify_modal} >
          <SuperVertifyForm {...superVertifyFormProps} styles={styles} />
        </div >
      </MainModal >
    )
  }
}

//谷歌验证码模态框
class RenderModal3 extends Component {
  render() {
    const {
      startInit, selectOne = {}, data, dispatch, changeState, emailVerificationCode, googleCode,
      BeforesellOTCSendMail, sellOTC, loading, modelName
    } = this.props
    const props = {
      modalProps: {
        style: {
          width: 900,
        },
      },
      ...this.props
    }
    const superVertifyFormProps = {
      vertifyIdCardCallBack: (res) => {
        if (res) {
          startInit()
          if (data === 'sell' && !selectOne.sell_bankVerified) {
            dispatch({
              type: `account/changeState`,
              payload: {
                superVertifyPage: 5
              }
            })
          } else {
            closeModal()
          }
        }
      },
      vertifyBankCallBack: (res) => {
        if (res) {
          startInit()
          closeModal()
        }
      }
    }
    const { closeModal, } = this.props
    return (
      <MainModal {...props}
                 title={'谷歌验证码'} >
        <div className={styles.googleCodeVertify_modal} >
          <GoogleCodeVertify
            emailCode={emailVerificationCode}
            emailCodeChange={(value) => {
              changeState({
                emailVerificationCode: value
              })
            }}
            googleCode={googleCode}
            googleCodeChange={(value) => {
              changeState({
                googleCode: value
              })
            }}
            countDown={() => {
              BeforesellOTCSendMail(selectOne)
            }}
            loadingEffect={loading.effects[`${modelName}/sellOTC`]}
            onSubmit={() => {
              sellOTC()
            }}

            className={styles.googleCodeVertify} />
        </div >
      </MainModal >
    )
  }
}




