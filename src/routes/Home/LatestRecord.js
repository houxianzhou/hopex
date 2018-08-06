import React, { Component } from 'react'
import { classNames, dealInterval, moment, _, formatNumber } from '@utils'
import switch_render from '@assets/switch_render.png'
import { Mixin, Table } from "@components"
import { COLORS } from '@constants'
import RedGreenArrow from './components/RedGreenArrow'
import ScrollPannel from './components/ScrollPanel'
import styles from './index.less'

export default class View extends Component {

  startInit = () => {
    // this.getLatestRecord()
  }

  getLatestRecord = () => {
    const { dispatch, modelName } = this.props
    dispatch({
      type: `${modelName}/getLatestRecord`,
    }).then(() => {
      this.interval = dealInterval(() => {
        this.getLatestRecord()
      })
    })
  }

  render() {
    const { model: { latest_records = [] }, RG, dispatch, modelName } = this.props
    const columns = [
      {
        title: '时间',
        dataIndex: 'time',
        width: '25%',
        render: (value) => {
          return moment.formatHMSFromSeconds(value)
        }
      },
      {
        title: '方向',
        dataIndex: 'type',
        width: '20%',
        render: (value) => value === '2' || value === '买' ? {
          value: '买入',
          className: 'green'
        } : {
          value: '卖出',
          className: 'red'
        }
      },
      {
        title: '价格',
        dataIndex: 'price',
        width: '35%',
        render: (value, record, index, dataSource) => {
          const style = { marginLeft: 7 }
          const next = dataSource[index + 1] || {}
          const img = Number(value) > Number(next.price) ? (
            <RedGreenArrow style={style} alt='top' RG={RG} />) : (Number(value) < Number(next.price) ? (
            <RedGreenArrow style={style} alt='down' RG={RG} />) : null)
          const result = <span >{formatNumber(value, 'p', true)}{img}</span >
          return record.type === '2' || record.type === '买' ? {
            value: result,
            className: 'green'
          } : {
            value: result,
            className: 'red'
          }
        }
      },
      {
        title: '数量(张)',
        dataIndex: 'amount',
        render: (value, record = {}) => (
          <span style={{ color: record.exist === '1' ? COLORS.yellow : null }} >
            {formatNumber(value, 0, true)}
            </span >
        )
      },
    ]
    const dataSource = latest_records
    const tableProps = {
      className: styles.tableContainer,
      columns,
      dataSource: _.merge((new Array(18)).fill(), dataSource),
      onClickRow: (item) => {
        dispatch({
          type: `${modelName}/changeState`,
          payload: {
            clickSelectOne: item
          }
        })
      },
      scroll: {
        mouseWheel: true,
        scrollY: true
      },
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

