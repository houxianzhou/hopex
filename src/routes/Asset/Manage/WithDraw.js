import React, { Component } from 'react'
import { connect } from 'dva'
import { COLORS } from "@constants"
import { Mixin, } from '@components'
import { classNames, _, } from '@utils'
import MoneySelect from './components/MoneySelect'
import Input from './components/Input'

import styles from './index.less'

@connect(({ modal, Loading }) => ({
  modal,
  loading: Loading
}))
export default class View extends Component {
  componentDidMount() {
    this.startInit()
  }

  startInit = () => {
    console.log('提现')
  }


  render() {
    const selectList = [
      { label: 'BTC', value: 'BTC' },
      { label: 'USD', value: 'USD' },
    ]
    return (
      <Mixin.Child that={this} >
        <div className={styles.withdraw} >
          <div className={styles.title} >提现</div >

          <div className={styles.moneytype} >
            币种
            <div className={styles.select} >
              <MoneySelect
                value={selectList[0]}
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
                <div >0.00000000BTC</div >
              </div >
              <div className={styles.getall} >全部提现</div >
            </div >
            <div className={styles.charge} >
              <div >
                <div >手续费：</div >
                <div >0.00000000BTC</div >
              </div >
              <div >
                <div >实际到账金额：</div >
                <div className={styles.fact}>0.00150000BTC</div >
              </div >
            </div >
            <div className={styles.buton}>
              <div>提交</div>
            </div>
          </div >


          <div className={styles.desc} >
            <div >重要提示</div >
            * 请不要向上述地址充值任何非BTC资产，否则将不可找回。<br />
            * 最低存款额为 0.001BTC (100000 聪)。<br />
            * 你的比特币会在6个网络确认后到帐。<br />
            * 所有Hopex的存款地址都是多重签名冷钱包地址，所有钱包均不曾被联网的机器读取。
          </div >
        </div >
      </Mixin.Child >
    )
  }
}


