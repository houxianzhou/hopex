import React, { Component } from 'react'
import { classNames, _, dealInterval, getPercent, formatNumber, } from '@utils'
import { Mixin, Table } from "@components"
import ensure from '@assets/ensure.png'
import ScrollPannel from './components/ScrollPanel'
import ColorChange from './components/ColorChange'
import styles from './index.less'

let max = null

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
        dataIndex: 'amount',
        render: (value, record, index, dataSource) => {
          return (
            <ColorChange
              color={'rgba(218,115,115,.2)'}
              data={{
                dataIndex: record.price,
                dataValue: value
              }}
              total={dataSource.map((item = {}) => ({
                dataIndex: item.price,
                dataValue: item.amount
              }))}
            >
              {value}
            </ColorChange >
          )
        }
      },
      {
        title: '累计数量(张)',
        dataIndex: 'sum',
        render: (value, record, index, dataSource) => {
          return <ColorChange color={'rgba(218,115,115,.2)'} percent={getPercent(value, max.sum)} >
            {value}
          </ColorChange >
        }
      }
    ]


    const tableProps = {
      className: styles.tableContainer,
      columns,
    }


    const tableTopProps = {
      ...tableProps,
      dataSource: (new Array((8 - dataTop.length) > 0 ? (8 - dataTop.length) : 0)).fill().concat(dataTop.slice(0, 8).map((item, index) => {
        item.type = 'sell'
        item.sum = _.sumBy(dataTop.slice(index, 8), ({ amount } = 0) => amount)
        return item
      }))
    }

    const tableDownProps = {
      ...tableProps,
      dataSource: _.merge((new Array(8)).fill(), dataDown.slice(0, 8).map((item, index) => {
        item.type = 'buy'
        item.sum = _.sumBy(dataDown.slice(0, index + 1), ({ amount } = 0) => amount)
        return item
      }))
    }

    max = _.maxBy([...tableTopProps.dataSource, ...tableDownProps.dataSource], ({ sum } = {}) => sum)

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

