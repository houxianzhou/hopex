import React, { Component } from 'react'
import { connect } from 'dva'
import { Mixin } from '@components'
import {classNames} from '@utils'

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
    const { model: { myName }, calculateTableHeight, dispatch, modelName, loading, history } = this.props

    return (
      <Mixin.Child that={this} >
        <div className={classNames(
          styles.container,
          styles.exchangeGuide
        )}>
          <div className={styles.questionTitle} >
            合约指南
          </div >
          <div className={styles.contentTitle}>委托</div>
          <div className={styles.contentDetail}>
            你可以在合约交易页面的委托区域提交各种类型的买入或卖出委托。<br /><br />
            当一个交易员提交买或卖委托时，在此委托被允许提交前，系统会检查其可用余额是否足以用作起始保证金。 如果此交易员在此产品中已有仓位，系统同时也会检查：若价格位于委托价格时，可用余额是否足以弥补维持保证金以及盈亏的变化。 如果他们有足够的资金，那么委托将被允许提交。 注：未被执行或取消的委托净值将使可用余额变小，变小的量相当于委托净值需要的起始保证金。
          </div>
          <div className={styles.contentTitle}>交易费用</div>
          <div className={styles.contentDetail}>
            交易费用包括，流动性提供方（挂单）手续费（当费率为负时表示用户获得手续费返还）、流动性提取方（吃单）手续费，强平手续费，交割手续费。
          </div>
          <div className={styles.contentTitle}>保证金</div>
          <div className={styles.contentDetail}>
            在你能够交易前，你必须存放比特币至你的保证金账户。 在Hopex，所有的保证金和盈亏都以BTC或者ETH计价，合约的结算货币可以在<span
            className={styles.routerGo}
            onClick={() => {
              if (history && history.replace) {
                history.replace('?page=ContractExplain')
              }
              // this.changePage(item.onClick, item.name)
            }}
            >合约详解</span>中查询。 你应该首先查看并熟悉
            <span
              className={styles.routerGo}
              onClick={() => {
                if (history && history.replace) {
                  history.replace('?page=MoneyTerms')
                }
                // this.changePage(item.onClick, item.name)
              }}
            >资金相关术语。</span>
          </div>
          <div className={styles.contentTitle}>逐仓保证金</div>
          <div className={styles.contentDetail}>
            逐仓保证金模式即每个合约的保证金是相互独立的。 在某合约仓位被强制平仓时，你的任何可用余额都不会用于增加此仓位的保证金。<br /><br />
            逐仓保证金对于投机仓位很有用。 通过隔离某仓位使用的保证金，你可以限制在此仓位的损失至起始保证金额，从而在你的短期投机交易策略失效时帮助到你。 在动荡的市场中，一个高杠杆化的仓位可能很快失去保证金。 然而，请注意，虽然Hopex的目标是尽量减少强平事件的发生，在动荡的市场中高度杠杆化更有可能被强平。 例如，一个 50 倍杠杆的仓位将在市场反向移动 1% 时被强平。
          </div>
          <div className={styles.contentTitle}>合理价格</div>
          <div className={styles.contentDetail}>
            Hopex采用独特设计的合理价格标记系统，以避免在高杠杆产品上发生不必要的强制平仓。如果没有这个系统，那么标记价格可能会由于市场被操纵或是缺乏流动性而与价格指数发生不必要的偏差，从而导致不必要的强制平仓。此系统将标记价格设置为合理价格而非最新交易价格，由此避免不必要的强平。<br /><br />
            注意，浮动盈亏和强平价格是按照合理价格计算的，不是市场价。
          </div>
          <div className={styles.contentTitle}>盈亏计算</div>
          <div className={styles.contentDetail} style={{border: 'none'}}>
            合约可以分为正向合约和反向合约，其盈亏计算方式不同，但是无论正向还是反向，买入开仓后市场上涨即可获利，反之卖出开仓后市场下跌即可获利。具体每个合约的盈亏计算方式可以在合约详情中查询。<br /><br />

            对于正向合约浮动盈亏<br />
            买入开仓的浮动盈亏 = 数量(张) * 合约价值(张) * (当前合理价格 - 开仓均价)<br />
            卖出开仓的浮动盈亏 = 数量(张) * 合约价值(张) * (开仓均价 - 当前合理价格)<br />
            对于正向合约平仓盈亏<br />
            买入开仓的持仓如果要平仓需要卖出平仓，反之卖出开仓的持仓如果要平仓需要买入平仓。<br />
            卖出平仓的平仓盈亏 = 数量(张) * 合约价值(张) * (平仓均价 - 开仓均价)<br />
            买入平仓的平仓盈亏 = 数量(张) * 合约价值(张) * (开仓均价 - 平仓均价)<br /><br />

            对于反向合约浮动盈亏<br />
            买入开仓的浮动盈亏 = 数量(张) * 合约价值(张) * (1 / 开仓均价 - 1 / 当前合理价格)<br />
            卖出开仓的浮动盈亏 = 数量(张) * 合约价值(张) * (1 / 当前合理价格 - 1 / 开仓均价)<br />
            对于反向合约平仓盈亏<br />
            买入开仓的持仓如果要平仓需要卖出平仓，反之卖出开仓的持仓如果要平仓需要买入平仓。<br />
            卖出平仓的平仓盈亏 = 数量(张) * 合约价值(张) * (1 / 开仓均价 - 1 / 平仓均价)<br />
            买入平仓的平仓盈亏 = 数量(张) * 合约价值(张) * (1 / 平仓均价 - 1 / 开仓均价)<br />
          </div>
        </div>
      </Mixin.Child >
    )
  }
}


