import React, { Component } from 'react'
import { connect } from 'dva'
import { Mixin, Button, } from '@components'
import { PATH } from '@constants'
import { classNames, _, Patterns, formatNumber, setDecimalPointLength } from '@utils'
import Input from '@routes/Components/Input'
import MoneySelect from '@routes/Asset/components/MoneySelect'
import GoogleCodeOpenModal from '@routes/Components/GoogleCodeOpenModal'
import GoogleCodeVertify from '@routes/Components/GoogleCodeVertify'

import styles from '@routes/Asset/index.less'

@connect(({ modal, asset, user, Loading }) => ({
  user,
  model: asset,
  modal,
  loading: Loading
}))
export default class View extends Component {
  constructor(props) {
    super(props)
    const { model: { detailDigital } } = this.props
    this.state = {
      active: detailDigital[0].assetName,
      addressMsg: '',
      address: '',
      amountMsg: '',
      amount: '',
      googleCode: '',
      emailVerificationCode: ''
    }
  }

  componentDidMount() {
    this.startInit()
  }

  startInit = () => {
    this.getAssetSummary()
  }

  getAssetSummary = () => {
    this.getWithdrawParameter()
  }

  changeMoney = (payload) => {
    this.changeState({ active: payload },
      () => {
        this.getWithdrawParameter()
      }
    )
  }

  getWithdrawParameter = () => {
    const { dispatch, modelName, } = this.props
    const { active } = this.state
    if (active) {
      dispatch({
        type: `${modelName}/getWithdrawParameter`,
        payload: {
          asset: active
        }
      })
    }
  }

  SendEmailToWithdraw = () => {
    const { dispatch, modelName } = this.props
    const { active, address = '', amount = '' } = this.state
    if (active) {
      dispatch({
        type: `${modelName}/SendEmailToWithdraw`,
        payload: {
          asset: active,
          addr: address,
          amount
        }
      }).then((res) => {
        if (res) {
          dispatch({
            type: `${modelName}/changeState`,
            payload: {
              withDrawPage: 2
            }
          })
        }
      })
    }
  }

  doWithdrawApply = () => {
    const { dispatch, modelName } = this.props
    const { active, address = '', amount = '', googleCode = '', emailVerificationCode = '' } = this.state
    if (active) {
      dispatch({
        type: `${modelName}/doWithdrawApply`,
        payload: {
          asset: active,
          toAddress: address,
          amount,
          googleCode,
          emailVerificationCode
        }
      }).then(res => {
        if (res) {
          dispatch({
            type: `${modelName}/routerGo`,
            payload: {
              pathname: PATH.asset,
              search: `?page=Record`
            }
          })
        }
      })
    }
  }

  checkAmount = (value, selectOne) => {
    const { changeState } = this
    if (Patterns.decimalNumber.test(value)) {
      if (value < Number(selectOne.minAmount)) {
        changeState({
          amountMsg: `最小提现数量${selectOne.minAmount}`
        })
      } else if (value > Number(selectOne.maxAmount)) {
        changeState({
          amountMsg: '可提现金额不足'
        })
      } else {
        changeState({
          amountMsg: ''
        })
      }
    } else {
      changeState({
        amountMsg: ''
      })
    }
  }


  render() {
    const { changeState, checkAmount } = this
    const { model: { detailDigital = [], withDrawPage = 1 }, user: { userInfo: { email = '' } = {} } = {}, modal: { name }, loading, modelName } = this.props
    const { active, address, amount, addressMsg, amountMsg, googleCode, emailVerificationCode } = this.state
    const selectList = detailDigital.map((item = {}) => ({ label: item.assetName, value: item.assetName }))
    const selectItem = selectList.filter((item = {}) => item.label === active)[0]
    const selectOne = detailDigital.filter((item = {}) => item.assetName === active)[0]
    const isNotAllow = () => {
      return selectOne.allowWithdraw === false || selectOne.isValid === false
    }
    return (
      <Mixin.Child that={this} >
        <div className={styles.withdraw} >
          {
            withDrawPage === 1 ? (
              <>
                {
                  isNotAllow() ? (
                    <div className={styles.notpermit} >账户不允许提现</div >
                  ) : null
                }
                <div className={styles.title} >提现</div >
                <div className={styles.moneytype} >
                  币种
                  <div className={styles.select} >
                    <MoneySelect
                      onChange={(option = {}) => {
                        this.changeMoney(option.value)
                        changeState({
                          addressMsg: '',
                          address: '',
                          amountMsg: '',
                          amount: '',
                        })
                      }}
                      value={selectItem}
                      options={selectList}
                    />
                  </div >
                </div >
                <ul className={styles.userinput} >
                  <li >
                    <div className={styles.label} >目标地址</div >
                    <div className={styles.input} >
                      <Input
                        value={address}
                        errorMsg={addressMsg}
                        onCheck={(value) => {
                        }}
                        onChange={(value) => {
                          changeState({ address: value })
                        }} />
                    </div >
                  </li >
                  <li >
                    <div className={styles.label} >金额({active})</div >
                    <div className={styles.input} >
                      <Input
                        errorMsg={amountMsg}
                        value={amount}
                        onCheck={(value) => {
                          checkAmount(value, selectOne)
                        }}
                        onChange={(value) => {
                          if (Patterns.decimalNumber.test(value) || value === '') {
                            changeState({ amount: setDecimalPointLength(value, 8) })
                          }
                        }} /></div >
                  </li >
                  <li >
                    <div className={styles.label} ></div >
                    <div className={styles.calcu} >
                      <div className={styles.elsemoney} >
                        <div >
                          <div >最大可提现金额：</div >
                          {
                            selectOne.maxAmount ? (
                              <div >{selectOne.maxAmount}{active}</div >
                            ) : null
                          }
                        </div >
                        <div className={styles.getall} onClick={() => {
                          changeState({
                            amount: selectOne.maxAmount
                          }, () => {
                            checkAmount(selectOne.maxAmount, selectOne)
                          })
                        }} >全部提现
                        </div >
                        {/*<div className={styles.notenougth} >可提金额不足</div >*/}
                      </div >
                      <div className={styles.charge} >
                        <div >
                          <div >手续费：</div >
                          {
                            selectOne.commission ? (<div >{selectOne.commission}{active}</div >) : null
                          }
                        </div >
                        <div >
                          <div >实际到账金额：</div >
                          <div
                            className={styles.fact} >
                            {
                              formatNumber(Math.max(Math.min(Number(amount) - Number(selectOne.commission), selectOne.maxAmount - Number(selectOne.commission)), 0), 8)
                            }{active}
                          </div >
                        </div >
                      </div >
                      <div className={classNames(
                        styles.button,
                        (address && !addressMsg && amount && !amountMsg) && !isNotAllow() ? styles.permit : null
                      )} >
                        <Button
                          loading={loading.effects[`${modelName}/SendEmailToWithdraw`]}
                          onClick={() => {
                            this.SendEmailToWithdraw()
                          }} >
                          提交
                        </Button >
                      </div >
                    </div >
                  </li >
                </ul >

                <div className={styles.desc} >
                  <div >重要提示</div >
                  <ul >
                    {
                      (selectOne.promptsWithDraw || []).map((item = '', index) => {
                        return <li key={index} >{item}</li >
                      })
                    }
                  </ul >
                </div >
              </>
            ) : (
              <div className={styles.page2} >
                <div className={styles.title} >提现安全验证</div >
                <GoogleCodeVertify
                  emailCode={emailVerificationCode}
                  emailCodeChange={(value) => {
                    changeState({ emailVerificationCode: value })
                  }}
                  googleCode={googleCode}
                  googleCodeChange={(value) => {
                    changeState({ googleCode: value })
                  }}
                  countDown={() => {
                    this.SendEmailToWithdraw()
                  }}

                  loadingEffect={loading.effects[`${modelName}/doWithdrawApply`]}
                  onSubmit={() => {
                    this.doWithdrawApply()
                  }}

                />
              </div >
            )
          }

          {
            name === 'googleCodeOpen' ? <GoogleCodeOpenModal {...this.props} /> : null
          }

        </div >
      </Mixin.Child >
    )
  }
}



