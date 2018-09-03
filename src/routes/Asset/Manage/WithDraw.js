import React, { Component } from 'react'
import { connect } from 'dva'
import { COLORS, PATH } from "@constants"
import { Mixin, CountDown, Button, RouterGo } from '@components'
import { classNames, _, Patterns } from '@utils'
import MainModal from '@routes/Components/MainModal'
import MoneySelect from './components/MoneySelect'
import Input from './components/Input'

import styles from './index.less'

@connect(({ modal, asset, user, Loading }) => ({
  user,
  model: asset,
  modal,
  loading: Loading
}))
export default class View extends Component {
  state = {
    active: '',
    addressMsg: '',
    address: '',
    amountMsg: '',
    amount: '',
    googleCode: '',
    emailVerificationCode: ''
  }

  componentDidMount() {
    this.startInit()
  }

  startInit = () => {
    this.getAssetSummary()
  }

  getAssetSummary = () => {
    const { dispatch, modelName } = this.props
    const { active } = this.state
    dispatch({
      type: `${modelName}/getAssetSummary`,
    }).then(res => {
      if (res) {
        if (!active) {
          this.changeMoney(res.detail[0].assetName)
        } else {
          this.getWithdrawParameter()
        }
      }
    })
  }

  changeMoney = (payload) => {
    this.changeState({ active: payload },
      () => {
        this.getWithdrawParameter()
      }
    )
  }

  getWithdrawParameter = () => {
    const { dispatch, modelName } = this.props
    const { active, } = this.state
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
          addr: address,
          amount,
          googleCode,
          emailVerificationCode
        }
      })
    }
  }


  render() {
    const { changeState } = this
    const { model: { detail = [], withDrawPage = 1 }, user: { userInfo: { email = '' } = {} } = {}, modal: { name }, loading, modelName } = this.props
    const { active, address, amount, addressMsg, amountMsg, googleCode, emailVerificationCode } = this.state
    const selectList = detail.map((item = {}) => ({ label: item.assetName, value: item.assetName }))

    const selectOne = detail.filter((item = {}) => item.assetName === active)[0] || {}
    return (
      <Mixin.Child that={this} >
        <div className={styles.withdraw} >
          {
            withDrawPage === 1 ? (
              <>
                {
                  (selectOne.allowWithdraw || true) ? null : (
                    <div className={styles.notpermit} >账户不允许提现</div >
                  )
                }
                <div className={styles.title} >提现</div >
                <div className={styles.moneytype} >
                  币种
                  <div className={styles.select} >
                    <MoneySelect
                      onChange={(option = {}) => {
                        this.changeMoney(option.value)
                      }}
                      value={selectList.filter((item = {}) => item.value === active)}
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
                        onChange={(value) => {
                          changeState({ address: value })
                        }} />
                    </div >
                  </li >
                  <li >
                    <div className={styles.label} >金额(BTC)</div >
                    <div className={styles.input} >
                      <Input
                        errorMsg={amountMsg}
                        value={amount}
                        onCheck={(value) => {
                          if (Patterns.decimalNumber.test(value)) {
                            if (value < Number(selectOne.minAmount)) {
                              changeState({
                                amountMsg: '最小提现数量'
                              })
                            } else if (value > Number(selectOne.maxAmount)) {
                              changeState({
                                amountMsg: '可用余额不足'
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
                        }}
                        onChange={(value) => {
                          if (Patterns.decimalNumber.test(value) || value === '') {
                            changeState({ amount: value })
                          }
                        }} /></div >
                  </li >
                </ul >
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
                    <div className={styles.getall} >全部提现</div >
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
                      <div className={styles.fact} >0BTC</div >
                    </div >
                  </div >
                  <div className={classNames(
                    styles.button,
                    (address && !addressMsg && amount && !amountMsg) ? styles.permit : null
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
                <ul className={styles.userinput} >
                  <li >
                    <div className={styles.label} >邮箱</div >
                    <div className={styles.email} >
                      {email}
                    </div >
                  </li >
                  <li >
                    <div className={styles.label} >邮箱验证码</div >
                    <div className={styles.input} >
                      <Input
                        placeholder={'请输入邮箱验证码'}
                        value={emailVerificationCode}
                        onChange={(value) => {
                          changeState({ emailVerificationCode: value })
                        }} >
                        <CountDown
                          onClick={() => {
                            this.SendEmailToWithdraw()
                          }}
                          beginText='发送'
                        />
                      </Input >
                    </div >
                  </li >
                  <li >
                    <div className={styles.label} >谷歌验证器</div >
                    <div className={styles.input} >
                      <Input
                        value={googleCode}
                        placeholder={'请输入谷歌验证码'}
                        onChange={(value) => {
                          changeState({ googleCode: value })
                        }} /></div >
                  </li >
                </ul >
                <div className={styles.calcu} >
                  <div className={
                    classNames(
                      styles.button,
                      (email && googleCode && emailVerificationCode) ? styles.permit : null
                    )
                  } >
                    <Button
                      loading={loading.effects[`${modelName}/doWithdrawApply`]}
                      onClick={() => {
                        this.doWithdrawApply()
                      }} >
                      提交
                    </Button >
                  </div >

                </div >
              </div >
            )
          }

          {
            name === 'googleCodeOpen' ? <RenderModal {...this.props} /> : null
          }

        </div >
      </Mixin.Child >
    )
  }
}


class RenderModal extends Component {
  render() {
    const props = {
      ...this.props
    }
    const { closeModal, } = this.props
    return (
      <MainModal {...props}  >
        <div className={styles.googleCodeOpen_Modal} >
          <div className={styles.content} >
            请先开启谷歌验证
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
                <RouterGo.SwitchRoute value={PATH.myaccount} >去开启</RouterGo.SwitchRoute >
              </Button >

            </div >
          </div >
        </div >

      </MainModal >
    )
  }
}


