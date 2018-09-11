import React, { Component } from 'react'
import { connect } from 'dva'
import { Mixin, Button, } from '@components'
import { classNames, _, Patterns, } from '@utils'
import { errorIcon } from '@assets'
import Input from '@routes/Components/Input'

import styles from '@routes/User/index.less'

@connect(({ account, Loading }) => ({
  model: account,
  loading: Loading,
}))
export default class View extends Component {
  state = {
    active: '',
  }

  componentDidMount() {
    this.startInit()
  }

  startInit = () => {

  }



  changePage = (page) => {
    const { dispatch, modelName } = this.props
    dispatch({
      type: `${modelName}/changeState`,
      payload: {
        superVertifyPage: page
      }
    })
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
    const { changeState, changePage } = this
    const { model: { superVertifyPage }, loading, dispatch, modelName } = this.props

    return (
      <Mixin.Child that={this} >
        <div className={styles.supervertify} >
          {
            superVertifyPage === 1 ? (
              <>
                <div className={styles.title} >高级认证</div >
                <ul className={styles.super} >
                  <li >
                    <div className={styles.label} >实名认证</div >
                    <div className={styles.status} >
                      <span >未认证</span >
                      <div className={
                        classNames(
                          styles.statusIcon,
                          styles.error
                        )

                      } >{errorIcon}</div >

                    </div >
                    <div className={styles.action} onClick={() => {
                      changePage(2)
                    }} >认证
                    </div >
                  </li >
                  <li >
                    <div className={styles.label} >银行卡</div >
                    <div className={styles.status} >
                      <span >未绑定</span >
                      <div className={
                        classNames(
                          styles.statusIcon,
                          styles.error
                        )
                      } >{errorIcon}</div >

                    </div >
                    <div className={styles.action} onClick={() => {
                      changePage(3)
                    }} >
                      绑定
                    </div >
                  </li >
                </ul >
              </>
            ) : null
          }

          {
            superVertifyPage === 2 ? (
              <>
                <div className={styles.title} >实名认证</div >
                <ul className={styles.userinput} >
                  <li >
                    <div className={styles.label} >姓名</div >
                    <div className={styles.input} >
                      <Input
                        placeholder={'请填写姓名'}
                        value={''}
                        onChange={(value) => {
                          changeState({ emailVerificationCode: value })
                        }} >
                      </Input >
                    </div >
                  </li >
                  <li >
                    <div className={styles.label} >身份证号</div >
                    <div className={styles.input} >
                      <Input
                        placeholder={'请填写身份证号'}
                        value={''}
                        onChange={(value) => {
                          changeState({ emailVerificationCode: value })
                        }} >
                      </Input >
                    </div >
                  </li >
                  <li className={styles.inputbutton} >
                    <div className={styles.label} ></div >
                    <div className={
                      classNames(
                        styles.button,
                        true ? styles.permit : null
                      )
                    } >
                      <Button
                        loading={loading.effects[`${modelName}/doWithdrawApply`]}
                        onClick={() => {
                        }} >
                        确认
                      </Button >
                    </div >
                  </li >
                </ul >
              </>
            ) : null
          }

          {
            superVertifyPage === 3 ? (
              <>
                <div className={styles.title} >绑定银行卡</div >
                <ul className={styles.userinput} >
                  <li >
                    <div className={styles.label} >持卡人姓名</div >
                    <div >
                      某某
                    </div >
                  </li >
                  <li >
                    <div className={styles.label} >银行卡号</div >
                    <div className={styles.input} >
                      <Input
                        placeholder={'请填写银行卡号'}
                        value={''}
                        onChange={(value) => {
                          changeState({ emailVerificationCode: value })
                        }} >
                      </Input >
                    </div >
                  </li >
                  <li >
                    <div className={styles.label} >银行名称</div >
                    <div className={styles.input} >
                      <Input
                        placeholder={'请填写银行名称，例如“中国银行”'}
                        value={''}
                        onChange={(value) => {
                          changeState({ emailVerificationCode: value })
                        }} >
                      </Input >
                    </div >
                  </li >
                  <li className={styles.inputbutton} >
                    <div className={styles.label} ></div >
                    <div className={
                      classNames(
                        styles.button,
                        true ? styles.permit : null
                      )
                    } >
                      <Button
                        loading={loading.effects[`${modelName}/doWithdrawApply`]}
                        onClick={() => {
                        }} >
                        确认
                      </Button >
                    </div >
                  </li >
                </ul >
              </>
            ) : null
          }
        </div >
      </Mixin.Child >
    )
  }
}




