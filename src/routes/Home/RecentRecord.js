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
        title: '当前价格',
        dataIndex: 'no',
        render: (v) => formatNumber(v, 'p')
      },
      {
        title: '当前合理价格',
        dataIndex: 'averagePrice',
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
        title: '开仓均价',
        dataIndex: 'averagePrice',
        render: (v) => formatNumber(v, 'p')
      },
      {
        title: '持续占用保证金',
        dataIndex: 'positionMoney',
        render: (v) => formatNumber(v, 'p')
      },
      {
        title: '维持保证金',
        dataIndex: 'keepMoney',
        render: (v) => formatNumber(v, 'p')
      },
      {
        title: '强平价格',
        dataIndex: 'overPrice',
        render: (v) => formatNumber(v, 'p')
      },
      {
        title: '浮动盈亏(收益率)',
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

