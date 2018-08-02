import React, { Component } from 'react'
import { classNames, dealInterval, _, formatNumber, getPercent } from '@utils'
import { Table, Mixin } from '@components'
import { SCROLLX } from '@constants'
import ScrollPannel from './components/ScrollPanel'
import styles from './index.less'


export default class View extends Component {
  startInit = () => {
    // this.getPosition()
  }

  getPosition = () => {
    const { dispatch, modelName } = this.props
    dispatch({
      type: `${modelName}/getPosition`
    }).then(() => {
      this.interval = dealInterval(() => {
        this.getPosition()
      })
    })
  }

  render() {
    const { model: { positionList = [], dealMoney } } = this.props
    const columns = [
      {
        title: '合约',
        dataIndex: 'market',
        render: (value) => ({
          value,
          className: 'blue'
        })
      },
      {
        title: '当前价格',
        dataIndex: 'lastPrice',
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
        render: (value) => Number(value) >= 0 ? {
          value,
          className: 'green'
        } : {
          value,
          className: 'red'
        }
      },
      {
        title: '开仓均价',
        dataIndex: 'averagePrice',
        render: (v) => formatNumber(v, 'p')
      },
      {
        title: '持仓占用保证金',
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
        render: (v, record) => {
          const value = `${formatNumber(v, 'p')}${dealMoney}` + `(${(formatNumber(record.profitRate * 100, 'p'))}%)`
          return Number(v) >= 0 ? {
            value,
            className: 'green'
          } : {
            value,
            className: 'red'
          }
        }
      },
      {
        title: '操作',
        width: 250,
        dataIndex: 'work',
      },

    ]
    const dataSource = positionList
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
              styles.position
            )
          }
        >
          <ScrollPannel
            header={
              <div >当前持仓</div >
            }
          >
            <Table {...tableProp} />

          </ScrollPannel >
        </div >
      </Mixin.Child >
    )
  }
}

