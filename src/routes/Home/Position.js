import React, { Component } from 'react'
import { classNames, dealInterval, _, formatNumber, getPercent } from '@utils'
import { Table, Mixin } from '@components'
import { SCROLLX, TABLE } from '@constants'
import add from '@assets/add.png'
import substract from '@assets/substract.png'
import ScrollPannel from './components/ScrollPanel'
import MainModal from './components/MainModal'
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
      this.interval = dealInterval(() => {
        this.getPosition()
      })
    })
  }

  render() {
    const { model: { positionList = [], dealMoney }, modal: { name }, modelName, dispatch } = this.props
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
        render: (v) => {
          return (
            <div className={styles.changepositionMoney} >
              <div onClick={() => {
                dispatch({
                  type: `${modelName}/openModal`,
                  payload: {
                    name: 'positionMoney'
                  }
                })
              }} ><img src={substract} /></div >
              <div className={styles.positionMoney} >{formatNumber(v, 'p')}</div >
              <div onClick={() => {

              }} ><img src={add} /></div >
            </div >
          )
        }
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
            tableHeight={TABLE.trHeight * (dataSource.length + 1)}
            header={
              <div >当前持仓</div >
            }
          >
            <Table {...tableProp} />
          </ScrollPannel >
        </div >
        {
          name === 'positionMoney' ? (<RenderModal {...this.props} />) : null
        }
      </Mixin.Child >
    )
  }
}

class RenderModal extends Component {
  render() {
    const props = {
      ...this.props,
      title:'持仓占用保证金'
    }
    return (
      <MainModal {...props}>fffff</MainModal >
    )
  }
}

