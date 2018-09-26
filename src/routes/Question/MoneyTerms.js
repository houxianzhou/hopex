import React, { Component } from 'react'
import { connect } from 'dva'
import { Mixin } from '@components'
import { classNames } from '@utils'

import * as styles from '@routes/Question/index.less'

@connect(({ Loading, dispatch, question }) => ({
  dispatch,
  model: question,
  modelName: 'question',
  loading: Loading
}))
export default class View extends Component {
  state = {}

  componentDidMount() {
    this.startInit()
  }

  startInit = () => {

  }


  render() {
    const { model: { myName }, calculateTableHeight, dispatch, modelName, loading } = this.props

    return (
      <Mixin.Child that={this} >
        <div className={classNames(
          styles.container,
          styles.exchangeGuide
        )} >
          <div className={styles.questionTitle} >
            资金相关术语
          </div >
          <div className={styles.contentTitle} >钱包总额</div >
          <div className={styles.contentDetail} >
            入金-出金+已实现盈亏。
          </div >
          <div className={styles.contentTitle} >已实现盈亏</div >
          <div className={styles.contentDetail} >
            平仓盈亏-实际收取或返还的流动性费（手续费）。
          </div >
          <div className={styles.contentTitle} >浮动盈亏</div >
          <div className={styles.contentDetail} >
            持有仓位的盈亏（以合理价格计算）。
          </div >
          <div className={styles.contentTitle} >总权益</div >
          <div className={styles.contentDetail} >
            钱包余额 + 浮动盈亏
          </div >
          <div className={styles.contentTitle} >委托占用保证金</div >
          <div className={styles.contentDetail} >
            为了保留您的委托有效所需要占用的金额。 这是您的所有委托订单的价值 * 起始保证金率之和。
          </div >
          <div className={styles.contentTitle} >持仓占用保证金</div >
          <div className={styles.contentDetail} style={{ border: 'none' }} >
            为了开立持仓所占用的保证金。这是您的所有持仓的开仓价值 * 起始保证金率之和外加手动增加的保证金。
          </div >
          <div className={styles.contentTitle} >
            提现冻结金额
          </div >
          <div className={styles.contentDetail} >
            您发起了提现申请后会冻结相应的金额直到提现完成。
          </div >
          <div className={styles.contentTitle} >可用金额</div >
          <div className={styles.contentDetail} style={{ border: 'none' }}>钱包总额-委托占用保证金-持仓占用保证金-提现冻结金额。</div >
        </div >
      </Mixin.Child >
    )
  }
}


