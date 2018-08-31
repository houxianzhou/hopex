import React, { Component } from 'react'
import { connect } from 'dva'
import { COLORS } from "@constants"
import { Mixin, } from '@components'
import { classNames, _, } from '@utils'
import MoneySelect from './components/MoneySelect'
import Input from './components/Input'

import styles from './index.less'

@connect(({ modal, asset, Loading }) => ({
  model: asset,
  modal,
  loading: Loading
}))
export default class View extends Component {
  state = {
    active: ''
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


  render() {
    const { model: { detail = [] } } = this.props
    const { active } = this.state
    const selectList = detail.map((item = {}) => ({ label: item.assetName, value: item.assetName }))

    const selectOne = detail.filter((item = {}) => item.assetName === active)[0] || {}
    return (
      <Mixin.Child that={this} >
        <div className={styles.withdraw} >
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
              <div className={styles.input} ><Input /></div >
            </li >
            <li >
              <div className={styles.label} >金额(BTC)</div >
              <div className={styles.input} ><Input /></div >
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
            <div className={styles.buton} >
              <div >提交</div >
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
        </div >
      </Mixin.Child >
    )
  }
}


