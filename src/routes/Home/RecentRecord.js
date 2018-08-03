import React, { Component } from 'react'
import { classNames, dealInterval, _, formatNumber } from '@utils'
import { Table, Mixin } from '@components'
import { SCROLLX } from '@constants'
import ScrollPannel from './components/ScrollPanel'
import styles from './index.less'

export default class View extends Component {
  state = {
    activeLi: 0
  }
  startInit = () => {
    // 暂时没有东西
    this.getPersonalEnsureHistory()
  }

  getPersonalEnsureHistory = () => {
    const { dispatch, modelName } = this.props
    dispatch({
      type: `${modelName}/getPersonalEnsureHistory`
    }).then((res) => {
        this.interval = dealInterval(() => {
          this.getPersonalEnsureHistory()
        })
      }
    )
  }

  changeState = (payload) => {
    this.setState(payload)
  }

  render() {
    const { activeLi } = this.state
    const { state, changeState } = this
    const { model: { personalEnsureHistory = [] } } = this.props
    const columns = [
      {
        title: '合约',
        dataIndex: 'market',
        render: (v) => (
          {
            value: v,
            className: 'blue'
          }
        )
      },
      {
        title: '类型',
        dataIndex: 'side',
        render: (v) => v === '1' ? {
          value: '卖',
          className: 'red'
        } : {
          value: '买',
          className: 'green'
        }
      },
      {
        title: '杠杆倍数',
        dataIndex: 'leverage',
      },
      {
        title: '数量(张)',
        dataIndex: 'amount',
        render: (value) => Number(value) >= 0 ? {
          value,
          className: 'green'
        } : {
          value,
          className: 'red'
        }
      },
      {
        title: '委托价格',
        dataIndex: 'price',
        render: (v) => formatNumber(v, 'p')
      },
      {
        title: '成交数量(张)',
        dataIndex: 'dealAmount',
        render: (v) => formatNumber(v, 'p')
      },
      {
        title: '成交均价',
        dataIndex: 'avgDealMoney',
        render: (v) => formatNumber(v, 'p')
      },
      {
        title: '平仓盈亏',
        dataIndex: 'unwindProfit',
        render: (v) => formatNumber(v, 'p')
      },
      {
        title: '手续费',
        dataIndex: 'dealFee',
        render: (v) => formatNumber(v, 'p')
      },
      {
        title: '委托时间',
        dataIndex: 'ctime',
      },
      {
        title: '状态',
        dataIndex: 'orderStatus',
        render: (v) => {
          let result
          switch (v) {
            case '0':
              result = '未知状态'
              break
            case '1':
              result = '部分成交，已撤销'
              break
            case '2':
              result = '完全成交'
              break
            case '3':
              result = '已撤销'
          }
          return result
        }
      },
      {
        title: '操作',
        width: 250,
        dataIndex: 'work',
      },
    ]

    let dataSource
    switch (activeLi) {
      case 0:
        dataSource = personalEnsureHistory
        break
      default:
        dataSource = []
    }

    const tableProp = {
      className: styles.tableContainer,
      columns,
      dataSource: _.merge((new Array(4)).fill(), dataSource),
      scroll: {
        x: SCROLLX.X
      }
    }
    return (
      <Mixin.Child that={this} >
        <div
          className={
            classNames(
              {
                view: true
              },
              styles.recentRecord
            )
          }
        >
          <ScrollPannel
            header={
              <div className={styles.header} >
                <ul className={classNames(
                  styles.tab,
                  styles.recentrecord_tab
                )} >
                  {
                    ['最近10条委托历史', '最近10条交割历史', '最近10条强平历史', '最近10条自动减仓历史'].map((item, index) => {
                      return (
                        <li
                          key={index}
                          className={classNames(
                            {
                              'active': state.activeLi === index
                            }
                          )}
                          onClick={() => {
                            changeState({
                              activeLi: index
                            })
                          }}
                        >{item}</li >
                      )
                    })
                  }
                </ul >
              </div >
            }
          >
            <Table {...tableProp} />
          </ScrollPannel >
        </div >
      </Mixin.Child >
    )
  }
}

