import React, { Component } from 'react'
import { classNames, _, dealInterval, getPercent, formatNumber, isEqual } from '@utils'
import { Mixin, Table } from "@components"
import ensure from '@assets/ensure.png'
import arrow_down from '@assets/arrow_down.png'
import arrow_top from '@assets/arrow_top.png'
import { COLORS } from '@constants'
import ScrollPannel from './components/ScrollPanel'
import ColorChange from './components/ColorChange'
import styles from './index.less'

let max = null

export default class View extends Component {

  componentDidUpdate(prevProps) {
    const { model: { latestPrice: prevLatestPrice } } = prevProps
    const { model: { latestPrice }, dispatch, modelName } = this.props
    if (!isEqual(prevLatestPrice, latestPrice)) {
      const result = latestPrice > prevLatestPrice ? 1 : 0
      dispatch({
        type: `${modelName}/changeState`,
        payload: {
          latestPriceTrend: result
        }
      })
    }
  }

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
    const { model: { ensure_records = [], latestPrice, indexPrice, equitablePrice, latestPriceTrend }, dispatch, modelName } = this.props
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
              data={{
                dataIndex: record.price,
                dataValue: value
              }}
              total={dataSource.map((item = {}) => ({
                dataIndex: item.price,
                dataValue: item.amount
              }))}
            >
              {value || '--'}
            </ColorChange >
          )
        }
      },
      {
        title: '累计数量(张)',
        dataIndex: 'sum',
        render: (value, record, index, dataSource) => {
          return <ColorChange color={record.type === 'sell' ? COLORS.redOpacity : COLORS.greenOpacity}
                              percent={getPercent(value, max.sum, 0.02)} >
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
                <div className={styles.left} >
                  {latestPrice}
                  {
                    latestPriceTrend ? (
                      <img alt='top' src={arrow_top} />
                    ) : (
                      <img alt='down' src={arrow_down} />
                    )
                  }
                </div >
                <div className={styles.right} >
                  <img alt='ensure' className={styles.ensure} src={ensure} />
                  {equitablePrice || null}/{indexPrice}
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

