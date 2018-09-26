import React, { Component } from 'react'
import { connect } from 'dva'
import { Mixin } from '@components'
import { classNames } from '@utils'

import * as styles from '@routes/Question/index.less'
import ColorStack from '@routes/Components/ColorStack.js'

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
        )} >
          <div className={styles.questionTitle} >
            强制平仓
          </div >
          <div className={styles.contentTitle} >概述</div >
          <div className={styles.contentDetail} >
            大多数Hopex的合约都提供高杠杆。 为保持仓位，投资者必须持有仓位价值一定比例的保证金，也称之为维持保证金。 每个合约最小维持保证金率见
            <span
              className={styles.routerGo}
              onClick={() => {
                if (history && history.replace) {
                  history.replace('?page=ContractExplain')
                }
                // this.changePage(item.onClick, item.name)
              }}
            >合约详解。</span>
            <br /><br />

            对于任一合约持仓，如果你的持仓占用保证金 + 浮动盈亏 &lt;= 持仓维持保证金，您的该合约持仓将被强制平仓，并将损失你的维持保证金。 <br /><br />
            你可以通过合约交易页面的当前持仓模块查看每个合约持仓的强平价格。<br /><br />

            Hopex使用合理价格来避免由于缺乏流动性或市场操纵而引起的强制平仓。
          </div >
          <div className={styles.contentTitle} >强平过程</div >
          <div className={styles.contentDetail} >
            1. Hopex取消此合约的所有未成交委托。<br />
            2. 如果此时还未能满足维持保证金要求，此仓位被强平引擎于破产价格接管。
          </div >
          <div className={styles.contentTitle} >强平结果</div >
          <div className={styles.contentDetail} >
            如果Hopex可以在比破产价格更好的价格平仓，那么额外的资金将被加入
            <span
              className={styles.routerGo}
              onClick={() => {
                if (history && history.replace) {
                  history.replace('?page=ContractExplain')
                }
              }}
            >保险基金</span>
            。如果Hopex无法在破产价格平仓，那么Hopex将花费保险基金并试图在市场中平仓。 如果仍然无法清理强平委托，这将导致自动减仓事件。
          </div >
          <div className={styles.questionTitle} style={{marginTop: '40px'}}>自动减仓</div >
          <div className={styles.contentTitle} >概述</div >
          <div className={styles.contentDetail} >
            当投资者被强制平仓时，他们的剩余仓位将被 BitMEX 的强平系统接管。
            如果强平仓位未能够在市场平仓，并且当标记价格达到破产价格时，自动减仓系统将会对持有反方向仓位的投资者进行减仓。减仓的先后顺序将根据杠杆和盈利比率决定。<br /><br />

            自动减仓将根据强平仓位的破产价格进行平仓。
          </div >
          <div className={styles.contentTitle} >自动减仓排序</div >
          <div className={styles.contentDetail} >
            在任何时候，你在序列中的位置都由一个指示器来显示。 该指标以10％的增量表示您在队列中的优先级：<br /><br />
            <div className={styles.colorContainer}>
              <ColorStack
                getStyle={(item) => ({
                  background: item || null,
                  // border:  null || '1px solid #3E4555'
                })}
              />
            </div>
            在上面的例子中，所有“灯”都点亮，这意味着你的位置在最高百分位。 在无法在市场上进行清仓的情况下，您可能会被自动减仓。<br />
            如果你被自动减仓，你将会收到邮件通知。 未成交委托将被取消，您可以自由重新开仓。<br />
          </div >
          <div className={styles.contentTitle} >自动减仓排序计算公式</div >
          <div className={styles.contentDetail} style={{ border: 'none' }} >
            减仓的优先次序是通过收益和杠杆计算出来的。 收益多的和杠杆高的的交易者会首先被自动减仓。<br /><br />

            排序 = 盈利百分比 * 有效杠杆(如果盈利) = 盈利百分比 / 有效杠杆(如果亏损)<br />
            其中<br />
            有效杠杆 = abs(标记价值) / (标记价值 - 破产价值)<br />
            盈利百分比 = (标记价值 - 平均开仓价值) / abs(平均开仓价值)<br />
            标记价值 = 位于标记价格时的仓位价值<br />
            破产价值 = 位于破产价格时的仓位价值<br />
            平均开仓价值 = 位于平均开仓价格时的仓位价值<br /><br />

            系统将多空双方分开由高之低排序。
          </div >
        </div >
      </Mixin.Child >
  )
  }
  }


