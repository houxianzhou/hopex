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
        usd: floatProfitUSD,
        symbol: true,// 这里需要正负号
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
                        value={item.symbol ? item.value : item.value.replace('+', '')} />
                    </div >
                    {
                      item.usd ? (<div >≈{item.usd}USD</div >) : null
                    }
                  </div >
                </li >
              ))
            }
          </ul >
          <div className={styles.bottom} >
            <div className={styles.title} >明细</div >
            <div className={styles.lis} >
              <ul key={0} className={styles.tableheader} >
                <li >
                  <div ></div >
                </li >
                {
                  detail.map((item = {}, index) => {
                    return (
                      <li key={index + 1} >
                        <div >{item.assetName}</div >
                      </li >
                    )
                  })
                }
              </ul >
              {
                [
                  {
                    title: '钱包余额',
                    value: 'walletBalance',
                    display: 'walletBalanceUSD'
                  },
                  {
                    title: '浮动盈亏',
                    value: 'floatProfit',
                    display: 'floatProfitUSD'
                  },
                  {
                    title: '总权益',
                    value: 'totalWealth',
                    display: 'totalWealthUSD'
                  },
                  {
                    title: '委托占用保证金',
                    value: 'delegateMargin',
                    display: 'delegateMarginUSD'
                  },
                  {
                    title: '仓占用保证金',
                    value: 'positionMargin',
                    display: 'positionMarginUSD'
                  },
                  {
                    title: '提现冻结金额',
                    value: 'withdrawFreeze',
                    display: 'withdrawFreezeUSD'
                  },
                  {
                    title: '可用金额',
                    value: 'availableBalance',
                    display: 'availableBalanceUSD'
                  }
                ].map((item = {}, index) => {
                  return (
                    <ul key={index + 1} >
                      <li key={0} >{item.title}</li >
                      {
                        detail.map((item2 = {}, index2) => {
                          return (
                            <li key={index2 + 1} >
                              <span >{item2[item.value]}</span >
                              {
                                item.display ? (
                                  <div >≈ {item2[item.display]}</div >
                                ) : null
                              }
                            </li >
                          )
                        })
                      }
                    </ul >
                  )
                })
              }
            </div >
          </div >
        </div >
      </Mixin.Child >
    )
  }
}


