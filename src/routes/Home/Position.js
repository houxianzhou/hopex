import React, { Component } from 'react'
import { classNames, dealInterval, _ } from '@utils'
import { Table, Mixin } from '@components'
import { SCROLLX} from '@constants'
import ScrollPannel from './components/ScrollPanel'
import styles from './index.less'


export default class View extends Component {
  startInit = () => {
    this.getPosition()
  }

  getPosition = () => {
    const { dispatch, modelName } = this.props
    dispatch({
      type: `${modelName}/getPosition`
    }).then(() => {
      dealInterval(() => {
        this.getPosition()
      })
    })
  }

  render() {
    const { model: { positionList = [] } } = this.props
    const columns = [
      {
        title: '合约',
        dataIndex: 'market',
      },
      {
        title: '当前价格',
        dataIndex: 'no',
      },
      {
        title: '当前合理价格',
        dataIndex: 'averagePrice',
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
      },
      {
        title: '持续占用保证金',
        dataIndex: 'positionMoney',
      },
      {
        title: '维持保证金',
        dataIndex: 'keepMoney',
      },
      {
        title: '强平价格',
        dataIndex: 'overPrice',
      },
      {
        title: '浮动盈亏(收益率)',
        dataIndex: 'floatProfit',
      },
      {
        title: '操作',
        width:250,
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

