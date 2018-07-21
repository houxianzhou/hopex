import React, { Component } from 'react'
import { classNames, _, dealInterval, getPercent, formatNumber, } from '@utils'
import { Mixin, Table } from "@components"
import ensure from '@assets/ensure.png'
import ScrollPannel from './components/ScrollPanel'
import ColorChange from './components/ColorChange'
import styles from './index.less'

const [TOP, DOWN] = ['top', 'down']

export default class View extends Component {

  startInit = () => {
    this.getEnsureRecord()
  }

  getEnsureRecord = () => {
    const { dispatch, modelName } = this.props
    dispatch({
      type: `${modelName}/getEnsureRecord`,
      payload: {
        mode: 'http'
      }
    }).then(res => {
      dealInterval(() => {
        this.getEnsureRecord()
      })
    })
  }

  render() {
    const { model: { ensure_records = [], latestPrice, indexPrice, equitablePrice } } = this.props
    const [dataTop = [], dataDown = []] = [
      _.get(ensure_records, 'asks')
      , _.get(ensure_records, 'bids')
    ]

    const columns = [
      {
        title: '价格',
        dataIndex: 'price',
        render: (value, record) => {
          return record.type === 'sell' ? {
            value,
            className: 'sell'
          } : {
            value,
            className: 'buy'
          }
        }
      },
      {
        title: '数量',
        dataIndex: 'amount'
      },
      {
        title: '累计数量(张)',
        dataIndex: 'amount',
        render: (value, record, index, dataSource) => {
          const total = dataSource.slice(0, index + 1).reduce((sum, next) => {
            return sum + next.amount
          }, 0)
          return total
        }
      }
    ]

    const tableProps = {
      className: styles.tableContainer,
      columns,

    }
    const tableTopProps = {
      ...tableProps,
      dataSource: dataTop.slice(0, 8).map(item => {
        item.type = 'sell'
        return item
      })
    }

    const tableDownProps = {
      ...tableProps,
      dataSource: dataDown.slice(0, 8).map(item => {
        item.type = 'buy'
        return item
      })
    }
    return (
      <Mixin.Child that={this} >
        <div
          className={
            classNames(
              {
                view: true
              },
              styles.ensureRecord
            )
          }
        >
          <ScrollPannel
            header={
              <div >
                <span >委托列表</span >
              </div >
            }
          >

            <div className={styles.content} >
              <div className={styles.top} >
                <Table {...tableTopProps} />
              </div >
              <div className={styles.center} >
                <div className={styles.left} >{latestPrice}</div >
                <div className={styles.right} >
                  <img alt='ensure' className={styles.ensure} src={ensure} />
                  {equitablePrice}/{indexPrice}
                </div >
              </div >
              <div className={styles.down} >
                <Table {...tableDownProps} />
              </div >
            </div >
          </ScrollPannel >
        </div >
      </Mixin.Child >
    )
  }
}

