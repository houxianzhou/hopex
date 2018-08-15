import React, { Component } from 'react'
import { classNames, dealInterval, _, formatNumber } from '@utils'
import { Table, Mixin, Button } from '@components'
import { SCROLLX, TABLE } from '@constants'
import RedGreenSwitch from './components/RedGreenSwitch'
import ScrollPannel from './components/ScrollPanel'
import styles from './index.less'

export default class View extends Component {
  state = {
    activeLi: 0
  }
  startInit = () => {
    // 暂时没有东西
    this.getHistory('1')
  }

  getHistory = (type) => {
    const { dispatch, modelName } = this.props
    dispatch({
      type: `${modelName}/getHistory`,
      payload: {
        type
      }
    }).then((res) => {
        if (!this._isMounted) return
        if (type === '1') {
          this.interval = dealInterval(() => {
            this.getHistory(type)
          })
        }
      }
    )
  }

  changeState = (payload) => {
    this.setState(payload)
  }

  render() {
    const { activeLi } = this.state
    const { state, changeState, getHistory } = this
    const { model: { personalEnsureHistory = [] }, noDataTip, calculateTableHeight, expandedRowRender, modelName, dispatch } = this.props
    const columns = [
      {
        title: '合约',
        dataIndex: 'marketName',
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
        render: (value) => value === '1' ? (
          <RedGreenSwitch.RedText value={'卖'} />
        ) : (
          <RedGreenSwitch.GreenText value={'买'} />
        )
      },
      {
        title: '杠杆倍数',
        dataIndex: 'leverage',
      },
      {
        title: '数量(张)',
        dataIndex: 'amount',
        render: (value) => Number(value) >= 0 ? (
          <RedGreenSwitch.GreenText value={value} />
        ) : (
          <RedGreenSwitch.RedText value={value} />
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
      },
      {
        title: '状态',
        dataIndex: 'orderStatus',
        width: 130,
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
        width: 150,
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
      scroll: {
        x: SCROLLX.X
      },
      noDataTip: () => noDataTip(dataSource, '当前无历史'),
      expandedRowRender,
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
            tableHeight={calculateTableHeight(dataSource)}
            header={
              <div className={styles.header} >
                <ul className={classNames(
                  styles.tab,
                  styles.recentrecord_tab
                )} >
                  {
                    [
                      {
                        name: '最近10条委托历史',
                        // type: '1', 默认为['1','2']
                      },
                      {
                        name: '最近10条交割历史',
                        type: '3'
                      },
                      {
                        name: '最近10条强平历史',
                        type: '4'
                      },
                      {
                        name: '最近10条自动减仓历史',
                        type: '5'
                      }
                    ].map((item = {}, index) => {
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
                            item.type && getHistory(item.type)
                          }}
                        >{item.name}</li >
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

