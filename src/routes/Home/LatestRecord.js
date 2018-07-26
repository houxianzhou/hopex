import React, { Component } from 'react'
import { classNames, dealInterval, moment, _ } from '@utils'
import switch_render from '@assets/switch_render.png'
import { Mixin, Table } from "@components"
import arrow_down from '@assets/arrow_down.png'
import arrow_top from '@assets/arrow_top.png'
import ScrollPannel from './components/ScrollPanel'
import styles from './index.less'

export default class View extends Component {

  startInit = () => {
     this.getLatestRecord()
  }

  getLatestRecord = () => {
    const { dispatch, modelName } = this.props
    dispatch({
      type: `${modelName}/getLatestRecord`,
    }).then(() => {
      dealInterval(() => {
        this.getLatestRecord()
      })
    })
  }

  render() {
    const { model: { latest_records = [] } } = this.props
    const columns = [
      {
        title: '时间',
        dataIndex: 'time',
        width: '30%',
        render: (value) => {
          return moment.formatHMSFromSeconds(value)
        }
      },
      {
        title: '类型',
        dataIndex: 'type',
        render: (value) => value === '2' || value === '买' ? {
          value: '买入',
          className: 'buy'
        } : {
          value: '卖出',
          className: 'sell'
        }
      },
      {
        title: '价格',
        dataIndex: 'price',
        render: (value, record, index, dataSource) => {
          const style = { marginLeft: 7 }
          const next = dataSource[index + 1] || {}
          const img = value > next.price ? (
            <img style={style} alt='top' src={arrow_top} />) : (value < next.price ? (
            <img style={style} alt='down' src={arrow_down} />) : null)
          const result = <span >{value}{img}</span >
          return record.type === '2' || record.type === '买' ? {
            value: result,
            className: 'buy'
          } : {
            value: result,
            className: 'sell'
          }
        }
      },
      {
        title: '数量(张)',
        dataIndex: 'amount',
      },
    ]
    const dataSource = latest_records
    const tableProps = {
      className: styles.tableContainer,
      columns,
      dataSource: _.merge((new Array(18)).fill(), dataSource),
      scroll: {},
    }
    return (
      <Mixin.Child that={this} >
        <div
          className={
            classNames(
              {
                view: true
              },
              styles.latestRecord
            )
          }
        >
          <ScrollPannel
            header={
              <div className={styles.record_header} >
                <span >最新成交</span >
                <img alt='switch' src={switch_render} />
              </div >
            }
          >
            <Table {...tableProps} />
          </ScrollPannel >
        </div >
      </Mixin.Child >
    )
  }
}

