import React, { Component } from 'react'
import { classNames, dealInterval, _, formatNumber } from '@utils'
import { Table, Mixin, Button, PagiNation } from '@components'
import { SCROLLX, TABLE } from '@constants'
import RedGreenSwitch from '@routes/Home/components/RedGreenSwitch'

import styles from './index.less'

export default class View extends Component {
  state = {
    activeLi: '1',
    total: 1,//总页数
    personalEnsureHistory: [],//最近10条委托历史
    deliveryHistory: [],//交割历史
    highlevelHistory: [],//强平历史
    reduceHistory: [],//减仓历史
  }

  componentDidMount() {
    // this.startInit()
  }

  startInit = () => {
    // 暂时没有东西
    this.getHistory()
  }

  changeState = (payload = {}, callback) => {
    this.setState(payload, () => {
      _.isFunction(callback) && callback()
    })
  }

  getHistory = (page = '0') => {
    const { activeLi } = this.state
    const { dispatch, modelName1 } = this.props
    dispatch({
      type: `${modelName1}/getHistory`,
      payload: {
        type: activeLi,
        page
      }
    }).then(res => {
      if (res) {
        this.changeState(
          {
            [res['historyList']]: res['result'],
            total: res.total
          }
        )
      }
    })
  }

  changeState = (payload) => {
    this.setState(payload)
  }

  render() {
    const { activeLi, personalEnsureHistory, total } = this.state
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
      case '1':
        dataSource = personalEnsureHistory
        break
      default:
        dataSource = []
    }

    const tableProp = {
      className: styles.tableContainer,
      columns,
      dataSource: dataSource,
    }

    const pageProp = {
      total: total,
      onPageChange: (e) => {
        getHistory(e)
      },
      containerClassName: styles.paginationcontainerClassName,
      pageClassName: 'paginationpageClassName',
      activeClassName:'paginationpageActiveClassName',
      previousClassName: 'paginationpageClassName',
      nextClassName:'paginationpageClassName',
    }
    return (
      <div
        className={
          classNames(
            styles.marketTradeHistory
          )
        }
      >
        <div style={{ height: calculateTableHeight(dataSource) }} >
          <Table {...tableProp} />
          <PagiNation {...pageProp} />
        </div >
      </div >
    )
  }
}

