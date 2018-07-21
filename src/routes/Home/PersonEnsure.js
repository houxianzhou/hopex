import React, { Component } from 'react'
import { classNames, moment, dealInterval } from '@utils'
import { Table, Mixin } from '@components'
import ScrollPannel from './components/ScrollPanel'
import styles from './index.less'


export default class View extends Component {
  startInit = () => {
    // this.getPersonalEnsure()
  }

  getPersonalEnsure = () => {
    const { dispatch, modelName } = this.props
    dispatch({
      type: `${modelName}/getPersonalEnsure`
    }).then((res) => {
        dealInterval(() => {
          this.getPersonalEnsure()
        })
      }
    )
  }

  render() {
    const { model: { personalEnsures, userInfo }, dispatch, modelName } = this.props
    const head = [
      {
        name: '合约',
        dataIndex: 'market',
      },
      {
        name: '类型',
        dataIndex: 'type',
        render: (value, record) => {
          const side = record.side === '1' ? '卖出' : (record.side ? '买入' : null)
          return <span>{side}</span>
        }
      },
      {
        name: '杠杆倍数',
        dataIndex: 'sex',
        render: (value, record) => ''
      },
      {
        name: '数量(张)',
        dataIndex: 'amount',
      },
      {
        name: '委托价格',
        dataIndex: 'price',
        //width: '30%',
      },
      {
        name: '成交数量(张)',
        dataIndex: 'amount',
        render: (value, record) => {
          return value - record.left
        }
      },
      {
        name: '成交均价',
        dataIndex: 'work',
        //width: '30%',
      },
      {
        name: '委托占用保证金',
        dataIndex: 'work',
        //width: '30%',
      },
      {
        name: '手续费',
        dataIndex: 'taker_fee',
        //width: '30%',
      },
      {
        name: '委托时间',
        dataIndex: 'ctime',
        render: (value) => value ? moment.formatHMS(String(value).split('.')[0] * 1000) : null
      },
      {
        name: '状态',
        dataIndex: 'amount',
        render: (value, record) => value && value === record.left ? '等待成交' : (value ? '部分成交' : null)
      },
      {
        name: '操作',
        dataIndex: 'orderId',
        render: (value, record) => {
          return value ? <span onClick={() => {
            dispatch({
              type: `${modelName}/doCancelPersonEnsure`,
              payload: {
                market: record.market,
                orderId: record.orderId
              }
            })
          }
          } ><a >撤销</a ></span > : null
        }
      },

    ]
    let data = personalEnsures
    data = data.length > 4 ? data : data.concat((new Array(4 - data.length)).fill({}))
    const tableProp = {
      head, data
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
            scroller={false}
            header={
              <div >活跃委托</div >
            }
          >
            <Table className={styles.table} {...tableProp}>等等</Table >

          </ScrollPannel >
        </div >
      </Mixin.Child >
    )
  }
}

