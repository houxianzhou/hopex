import React, { Component } from 'react'
import { connect } from 'dva'
import { Mixin, Button, } from '@components'
import { classNames, _, Patterns, } from '@utils'
import { errorIcon2, rightIcon2 } from '@assets'
import Input from '@routes/Components/Input'

@connect(({ account, Loading }) => ({
  model: account,
  loading: Loading,
  modelName: 'account'
}))
export default class View extends Component {
  state = {
    name: '',
    card: '',
    bank: '',
    bankName: ''
  }

  componentDidMount() {
    this.startInit()
  }

  startInit = () => {
    this.getCertificationALL()
  }

  getCertificationALL = () => {
    const { dispatch, modelName } = this.props
    dispatch({
      type: `${modelName}/getCertificationAll`
    })
  }

  changePage = (page) => {
    const { dispatch, modelName } = this.props
    if (page === 1) {
      this.getCertificationALL()
    }
    dispatch({
      type: `${modelName}/changeState`,
      payload: {
        superVertifyPage: page
      }
    })
  }

  vertifyIdCard = (callback) => {
    const { dispatch, modelName } = this.props
    const { name, card } = this.state
    dispatch({
      type: `${modelName}/doVertifyIdCard`,
      payload: {
        name,
        card
      }
    }).then(res => {
      if (callback && _.isFunction(callback)) {
        this.getCertificationALL()
        callback(res)
      } else if (res) {
        this.changePage(1)
      }
    })
  }

  vertifyBank = (callback) => {
    const { dispatch, modelName } = this.props
    const { bank, bankName } = this.state
    dispatch({
      type: `${modelName}/doVertifyBank`,
      payload: {
        bank,
        bankName
      }
    }).then(res => {
      if (callback && _.isFunction(callback)) {
        callback(res)
      } else if (res) {
        this.changePage(1)
      }
    })
  }

  removeBindBank = () => {
    const { dispatch, modelName } = this.props
    const { bank, bankName } = this.state
    dispatch({
      type: `${modelName}/doRemoveBindBank`,
      payload: {
        bank,
        bankName
      }
    }).then(res => {
      if (res) {
        this.changePage(1)
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
    const { changeState, changePage, vertifyIdCard, vertifyBank, removeBindBank } = this
    const { name, card, bank, bankName } = this.state
    const {
      model: {
        superVertifyPage,
        idCard: { verified: verified_idCard = false, realName = '', idCardNo = '' } = {},//实名
        bank: { verified: verified_bank = false, bankName: bank_Name = '', bankNo = '', owner = '' } = {},//银行卡
      }, loading, modelName, styles,
      vertifyIdCardCallBack, vertifyBankCallBack
    } = this.props
    return (
      <Mixin.Child that={this} >
        <div className={
          classNames(
            styles.supervertifyform,
            'supervertifyform'
          )
        } >
          {
            superVertifyPage === 1 ? (
              <>
                <div className={styles.title} >高级认证</div >
                <ul className={styles.super} >
                  <li >
                    <div className={styles.label} >实名认证</div >
                    <div className={styles.status} >
                      {
                        verified_idCard ? (
                          <>
                            {realName}
                            <span >{idCardNo}</span >
                          </>
                        ) : (
                          <span >未认证</span >
                        )
                      }

                      <div className={
                        classNames(
                          styles.statusIcon,
                        )

                      } >{verified_idCard ? rightIcon2 : errorIcon2}</div >

                    </div >
                    {
                      verified_idCard ? '' : (
                        <div className={styles.action} onClick={() => {
                          changePage(2)
                        }} >
                          认证
                        </div >
                      )
                    }
                  </li >
                  <li >
                    <div className={styles.label} >银行卡</div >
                    <div className={styles.status} >
                      {
                        verified_bank ? (
                          <>
                            {owner}
                            <span >{bank_Name}</span >
                            <span >{bankNo}</span >
                          </>
                        ) : (
                          '未绑定'
                        )
                      }
                      <div className={
                        classNames(
                          styles.statusIcon,
                        )
                      } >{verified_bank ? rightIcon2 : errorIcon2}</div >

                    </div >
                    {
                      verified_idCard ? (
                        verified_bank ? (
                          <div className={
                            classNames(
                              styles.action,
                              styles.removebind
                            )
                          } >
                            <Button
                              loading={loading.effects[`${modelName}/doRemoveBindBank`]}
                              onClick={() => {
                                removeBindBank()
                              }} >
                              解除绑定
                            </Button >

                          </div >
                        ) : (
                          <div className={styles.action} onClick={() => {
                            changePage(3)
                          }} >
                            绑定
                          </div >
                        )
                      ) : null
                    }
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
                        value={name}
                        onChange={(value) => {
                          changeState({ name: value })
                        }} >
                      </Input >
                    </div >
                  </li >
                  <li >
                    <div className={styles.label} >身份证号</div >
                    <div className={styles.input} >
                      <Input
                        placeholder={'请填写身份证号'}
                        value={card}
                        onChange={(value) => {
                          changeState({ card: value })
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
                        loading={loading.effects[`${modelName}/doVertifyIdCard`]}
                        onClick={() => {
                          vertifyIdCard()
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
            superVertifyPage === 4 ? (
              <div className={styles.specialStyleForAsset}>
                <ul className={styles.userinput} >
                  <li >
                    <div className={styles.label} >姓名</div >
                    <div className={styles.input} >
                      <Input
                        placeholder={'请填写姓名'}
                        value={name}
                        onChange={(value) => {
                          changeState({ name: value })
                        }} >
                      </Input >
                    </div >
                  </li >
                  <li >
                    <div className={styles.label} >身份证号</div >
                    <div className={styles.input} >
                      <Input
                        placeholder={'请填写身份证号'}
                        value={card}
                        onChange={(value) => {
                          changeState({ card: value })
                        }} >
                      </Input >
                    </div >
                  </li >
                  <li className={styles.inputbutton} >
                    <div className={
                      classNames(
                        styles.button,
                        true ? styles.permit : null
                      )
                    } >
                      <Button
                        loading={loading.effects[`${modelName}/doVertifyIdCard`]}
                        onClick={() => {
                          vertifyIdCard(vertifyIdCardCallBack)
                        }} >
                        确认
                      </Button >
                    </div >
                  </li >
                </ul >
              </div>
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
                      {realName}
                    </div >
                  </li >
                  <li >
                    <div className={styles.label} >银行卡号</div >
                    <div className={styles.input} >
                      <Input
                        placeholder={'请填写银行卡号'}
                        value={bank}
                        onChange={(value) => {
                          changeState({ bank: value })
                        }} >
                      </Input >
                    </div >
                  </li >
                  <li >
                    <div className={styles.label} >银行名称</div >
                    <div className={styles.input} >
                      <Input
                        placeholder={'请填写银行名称，例如“中国银行”'}
                        value={bankName}
                        onChange={(value) => {
                          changeState({ bankName: value })
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
                        loading={loading.effects[`${modelName}/doVertifyBank`]}
                        onClick={() => {
                          vertifyBank()
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
            superVertifyPage === 5 ? (
              <div className={styles.specialStyleForAsset}>
                <ul className={styles.userinput} >
                  <li >
                    <div className={styles.label} >持卡人姓名</div >
                    <div >
                      {realName}
                    </div >
                  </li >
                  <li >
                    <div className={styles.label} >银行卡号</div >
                    <div className={styles.input} >
                      <Input
                        placeholder={'请填写银行卡号'}
                        value={bank}
                        onChange={(value) => {
                          changeState({ bank: value })
                        }} >
                      </Input >
                    </div >
                  </li >
                  <li >
                    <div className={styles.label} >银行名称</div >
                    <div className={styles.input} >
                      <Input
                        placeholder={'请填写银行名称，例如“中国银行”'}
                        value={bankName}
                        onChange={(value) => {
                          changeState({ bankName: value })
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
                        loading={loading.effects[`${modelName}/doVertifyBank`]}

                        onClick={() => {
                          vertifyBank(vertifyBankCallBack)
                        }} >
                        确认
                      </Button >
                    </div >
                  </li >
                </ul >
              </div>
            ) : null
          }
        </div >
      </Mixin.Child >
    )
  }
}




