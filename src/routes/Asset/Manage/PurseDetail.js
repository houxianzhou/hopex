import React, { Component } from 'react'
import { connect } from 'dva'
import { Mixin, Table } from '@components'
import { classNames, _, } from '@utils'
import { Rights, $B, Home, $B2, Diamond } from '@assets'
import RedGreenSwitch from '@routes/Components/RedGreenSwitch'

import styles from '../index.less'

@connect(({ modal, Loading, asset }) => ({
  modal,
  model: asset,
  loading: Loading
}))
export default class View extends Component {
  componentDidMount() {
    this.startInit()
  }

  startInit = () => {
    const { dispatch, modelName } = this.props
    dispatch({
      type: `${modelName}/getAssetSummary`,
      payload: { forceUpdate: true }
    })
  }

  render() {
    const {
      model: {
        summary: {
          totalWealth = '', totalWealthUSD = '', floatProfit = '', floatProfitUSD = '',
          profitRate = ''
        } = {},
        detail = []
      } = {}
    } = this.props
    const listSummary = [

      {
        icon: Rights,
        title: '账户总权益估值(BTC)',
        value: totalWealth,
        usd: totalWealthUSD
      },
      {
        icon: $B,
        title: '总浮动盈亏估值(BTC)',
        value: floatProfit,
        usd: floatProfitUSD
      },
      {
        icon: Home,
        title: '当前持仓收益率',
        value: profitRate,
      }
    ]

    return (
      <Mixin.Child that={this} >
        <div className={styles.purseDetail} >
          <ul className={styles.header} >
            {
              listSummary.map((item = {}, index) => (
                <li key={index} >
                  <div className={styles.left} >
                    {item.icon}
                  </div >
                  <div className={styles.right} >
                    <div className={styles.title} >{item.title}</div >
                    <div className={styles.value} >
                      <RedGreenSwitch.MarkText
                        mark={item.value}
                        value={item.value.replace('+', '')} />
                    </div >
                    {
                      item.usd ? (<div >≈{item.usd}USD</div >) : null
                    }
                  </div >
                </li >
              ))
            }
          </ul >
          {/*<div className={styles.bottom} >*/}
            {/*<div className={styles.title}>明细</div >*/}
            {/*<div className={styles.lis} >{*/}
              {/*[{*/}
                {/*title: '钱包余额',*/}
                {/*value: 'walletBalance',*/}
                {/*display: 'walletBalanceUSD'*/}
              {/*}].map((item = {}, index) => {*/}
                {/*return (*/}
                  {/*<ul key={index} >*/}
                    {/*<li key={0} >{item.title}</li >*/}
                    {/*{*/}
                      {/*detail.map((item2 = {}, index2) => {*/}
                        {/*return (*/}
                          {/*<li key={index2 + 1} >*/}
                            {/*<span>{item2[item.value]}</span>*/}
                            {/*{*/}
                              {/*item.display ? (*/}
                                {/*<div >≈ {item2[item.display]}</div >*/}
                              {/*) : null*/}
                            {/*}*/}
                          {/*</li >*/}
                        {/*)*/}
                      {/*})*/}
                    {/*}*/}
                  {/*</ul >*/}
                {/*)*/}
              {/*})*/}
            {/*}*/}

            {/*</div >*/}
          {/*</div >*/}

          <ul className={styles.down} >
            {
              detail.map((item, index) => {
                const list2 = [
                  {
                    name: '浮动盈亏',
                    value: item.floatProfit,
                    prec: item.floatProfitUSD,
                  },
                  {
                    name: '钱包余额',
                    value: item.walletBalance,
                    prec: item.walletBalanceUSD,
                  },
                  {
                    name: '可用金额',
                    value: item.availableBalance,
                    prec: item.availableBalanceUSD,
                  },
                  {
                    name: '委托占用保证金',
                    value: item.delegateMargin,
                    prec: item.delegateMarginUSD,
                  },
                  {
                    name: '持仓占用保证金',
                    value: item.positionMargin,
                    prec: item.positionMarginUSD,
                  },
                  {
                    name: '冻结提现金额',
                    value: item.withdrawFreeze,
                    prec: item.withdrawFreezeUSD,
                  },
                ]
                return (
                  <li key={index} >
                    <div className={styles.liheader} >
                      <div className={styles.left} >
                        <div className={styles.desc} >{item.assetName}总权益</div >
                        <div className={styles.value} >
                          <div >{item.totalWealth}</div >
                          <div >(≈{item.totalWealthUSD})</div >
                        </div >
                      </div >
                      <div >
                        {[$B2, Diamond][index]}
                      </div >
                    </div >
                    <div className={styles.licontent} >
                      <ul >
                        {
                          list2.map((item2, index) => (
                            <li key={index} >
                              <div className={styles.leftdeco} />
                              {
                                index > 2 ? <div className={styles.topdeco} /> : null
                              }
                              <div className={styles.contentdeco} >
                                <div className={styles.name} >{item2.name}</div >
                                <div className={styles.value} >
                                  <RedGreenSwitch.MarkText
                                    mark={item2.value}
                                    value={item2.value.replace('+', '')} />
                                </div >
                                <div className={styles.prec} >≈{item2.prec}</div >
                              </div >
                            </li >
                          ))
                        }
                      </ul >
                    </div >
                  </li >
                )
              })
            }
          </ul >
        </div >
      </Mixin.Child >
    )
  }
}


