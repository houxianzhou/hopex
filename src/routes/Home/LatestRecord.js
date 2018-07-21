import React, { Component } from 'react'
import { classNames, dealInterval, moment, _ } from '@utils'
import switch_render from '@assets/switch_render.png'
import { Mixin, Table2 } from "@components"
import ScrollPannel from './components/ScrollPanel2'
import styles from './index.less'

export default class View extends Component {

  startInit = () => {
    this.getLatestRecord()
  }

  getLatestRecord = () => {
    const { dispatch, modelName } = this.props
    dispatch({
      type: `${modelName}/getLatestRecord`,
    }).then((res) => {
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
        render: (value, record) => {
          return moment.formatHMSFromSeconds(value)
        }
      },
      {
        title: '类型',
        dataIndex: 'type',
        render: (value, record) => value === 'buy' ? {
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
        render: (value, record) => record.type === 'buy' ? {
          value,
          className: 'buy'
        } : {
          value,
          className: 'sell'
        }
      },
      {
        title: '数量(张)',
        dataIndex: 'amount',
      },
    ]
    const dataSource = []//latest_records
    const tableProps = {
      className: styles.tableContainer,
      columns,
      dataSource: _.merge((new Array(18)).fill(), dataSource),
      scroll: {}
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
            <Table2 {...tableProps}>
              ffff
            </Table2 >
          </ScrollPannel >
        </div >
      </Mixin.Child >
    )
  }
}

