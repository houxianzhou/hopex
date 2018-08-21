import React, { Component } from 'react'
import { classNames, dealInterval, _, formatNumber } from '@utils'
import { Table, Mixin, Button } from '@components'
import { SCROLLX, TABLE } from '@constants'
import RedGreenSwitch from '@routes/Home/components/RedGreenSwitch'

import styles from './index.less'

export default class View extends Component {
  state = {
    activeLi: 0,
    personalEnsureHistory: [],//最近10条委托历史
    deliveryHistory: [],//交割历史
    highlevelHistory: [],//强平历史
    reduceHistory: [],//减仓历史
  }

  componentDidMount() {
    this.startInit()
  }

  startInit = () => {
    // 暂时没有东西
    this.getHistory('1')
  }

  changeState = (payload = {}, callback) => {
    this.setState(payload, () => {
      _.isFunction(callback) && callback()
    })
  }

  getHistory = (type) => {
    const { dispatch, modelName1 } = this.props
    dispatch({
      type: `${modelName1}/getHistory`,
      payload: {
        type,
        page: '0'
      }
    }).then(res => {
      if (res) {
        this.changeState(
          {
            [res[1]]: res[0]
          }
        )
      }
    })
  }

  changeState = (payload) => {
    this.setState(payload)
  }

  render() {
    const { activeLi, personalEnsureHistory } = this.state
    const { state, changeState, getHistory } = this
    const {
      noDataTip, calculateTableHeight,
      modelName, dispatch, switchMarket
    } = this.props
    const columns = [
      {
        title: '合约',
        dataIndex: 'marketName',
        render: (v, record = {}) => (
          {
            value: v,
            className: 'blue'
          }
        )
      },
      {
        title: '类型',
        dataIndex: 'side',
        render: (value) => value === '1' ? (
          <RedGreenSwitch.RedText value={'卖出'} />
        ) : (
          <RedGreenSwitch.GreenText value={'买入'} />
        )
      },
      {
        title: '杠杆倍数',
        dataIndex: 'leverage',
      },
      {
        title: '数量(张)',
        dataIndex: 'amount',
        render: (value, record = {}) => String(record.side) === '1' ? (
          <RedGreenSwitch.RedText value={value} />
        ) : (
          <RedGreenSwitch.GreenText value={value} />
        )
      },
      {
        title: '委托价格',
        dataIndex: 'price',
        //render: (v) => formatNumber(v, 'p')
      },
      {
        title: '成交数量(张)',
        dataIndex: 'dealAmount',
        // render: (v) => formatNumber(v, 'p')
      },
      {
        title: '成交均价',
        dataIndex: 'avgDealMoney',
        // render: (v) => formatNumber(v, 'p')
      },
      {
        title: '平仓盈亏',
        dataIndex: 'unwindProfit',
        // render: (v) => formatNumber(v, 'p')
      },
      {
        title: '手续费',
        dataIndex: 'dealFee',
        // render: (v) => formatNumber(v, 'p')
      },
      {
        title: '委托时间',
        dataIndex: 'ctime',
        width: 180
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
        dataIndex: 'orderStatus',
        render: (value, record = {}) => {
          return ({
              value: (
                ['1', '2'].indexOf(record.orderStatus) > 0 ? (
                  <span onClick={(e) => {
                    e.stopPropagation()
                    dispatch({
                      type: `${modelName}/getPersonEnsureDetail`,
                      payload: {
                        type: '1',
                        market: record.market,
                        orderId: record.orderId
                      }
                    })
                  }} >
                    <Button loading={record.loading} layer={false} loadingSize={16} >
                          成交明细
                        </Button >
                  </span >
                ) : null

              ),
              className: 'blue action'
            }
          )
        }
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
      dataSource: dataSource, //_.merge((new Array(4)).fill(), dataSource),
    }
    return (
      <div
        className={
          classNames(
            styles.marketTradeHistory
          )
        }
      >
        <div style={{ height: 500 }} >
          <Table {...tableProp} />
        </div >
      </div >
    )
  }
}

