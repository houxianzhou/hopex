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
            反向合约计算示例
            <p><span className={styles.Asterisk}>*</span>此处示例未考虑交易费率和复杂逻辑，目的是直观地展示保证金交易的概念</p>
          </div >
          <div className={styles.contentDetail} style={{border: 'none', paddingTop: 0}}>

            假设BTCUSD合约当前价格为8000，每张合约价值1USD，起始保证金率为2%(50倍杠杆)<br /><br />

            用户A以8000的价格提交100000张买入委托，委托占用保证金 = 数量(张) * 合约价值 (张) / 买入委托价格 * 持仓起始保证金率 = 100000 * 1 / 8000 * 2% = 0.25BTC<br /><br />

            假设用户A以8000的价格成交了这100000张买入委托，成交均价为8000，持仓占用保证金 = 数量(张) * 合约价值(张) / 开仓均价 * 持仓起始保证金率 = 100000 * 1 / 8000 * 2% = 0.25BTC<br /><br />

            一段时间后，BTCUSD合约价格涨至8500，用户A以8500的价格提交100000张卖出委托。由于这100000张卖出委托都是平仓，所以不需要委托占用保证金。<br /><br />

            假设用户A以8500的价格成交了这100000张卖出委托，成交均价为8500，那么平仓盈亏 = 数量(张) * 合约价值(张) * (1 / 开仓均价 - 1 / 平仓均价) = 100000 * 1 * (1 / 8000 - 1 / 8500) = 0.7353BTC<br /><br />

            综上，通过这一单交易，用户A盈利了0.7353BTC，收益率 = 0.7353 / 0.25 = 294%。如果没有引入杠杆交易(起始保证金率为100%)，那么这一单需要投入12.5BTC，收益率 = 0.7353 / 12.5 = 5.88%。正因为引入了杠杆交易机制，使收益率放大了50倍。<br /><br />

            注意，盈利率或亏损率均会因为引入杠杆机制而放大，因此在市场价格往不利方向发展时注意账户风险控制。
          </div >
        </div >
      </Mixin.Child >
    )
  }
}


