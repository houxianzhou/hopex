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
    // this.getPersonalEnsure()
  }

  getPersonalEnsure = () => {
    const { dispatch, modelName } = this.props
    dispatch({
      type: `${modelName}/getPersonalEnsure`
    }).then((res) => {
        this.interval = dealInterval(() => {
          this.getPersonalEnsure()
        })
      }
    )
  }

  changeState = (payload) => {
    this.setState(payload)
  }

  render() {
    const { state, changeState } = this
    const { model: { positionList = [] } } = this.props
    const columns = [
      {
        title: '合约',
        dataIndex: 'market',
      },
      {
        title: '类型',
        dataIndex: 'no',
        render: (v) => formatNumber(v, 'p')
      },
      {
        title: '杠杆倍数',
        dataIndex: 'leverage',
      },
      {
        title: '数量(张)',
        dataIndex: 'amount',
      },
      {
        title: '委托价格',
        dataIndex: 'averagePrice',
        render: (v) => formatNumber(v, 'p')
      },
      {
        title: '成交数量(张)',
        dataIndex: 'positionMoney',
        render: (v) => formatNumber(v, 'p')
      },
      {
        title: '成交均价',
        dataIndex: 'keepMoney',
        render: (v) => formatNumber(v, 'p')
      },
      {
        title: '平仓盈亏',
        dataIndex: 'overPrice',
        render: (v) => formatNumber(v, 'p')
      },
      {
        title: '手续费',
        dataIndex: 'floatProfit',
        render: (v) => formatNumber(v, 'p')
      },
      {
        title: '委托时间',
        dataIndex: 'floatProfit',
        render: (v) => formatNumber(v, 'p')
      },
      {
        title: '状态',
        dataIndex: 'floatProfit',
        render: (v) => formatNumber(v, 'p')
      },
      {
        title: '操作',
        width: 250,
        dataIndex: 'work',
      },
    ]
    const dataSource = []
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

