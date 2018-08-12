import React, { Component } from 'react'
import { classNames, dealInterval, moment, _, formatNumber } from '@utils'
import { Mixin, Table } from "@components"
import { COLORS } from '@constants'
import RedGreenSwitch from './components/RedGreenSwitch'
import ScrollPannel from './components/ScrollPanel'
import ColorChange from './components/ColorChange'
import styles from './index.less'


function Color(Props) {
  const { record = {}, dataSource = [], children } = Props
  return (
    <ColorChange
      all={true}
      data={{
        dataIndex: record.id,
        dataValue: record.id,
      }}
      total={dataSource.map((item = {}) => ({
        dataIndex: item.id,
        dataValue: item.id,
      }))}
    >
      {children}
    </ColorChange >
  )
}

export default class View extends Component {
  startInit = () => {
    this.getLatestRecord()
  }


  getLatestRecord = () => {
    const { dispatch, modelName } = this.props
    dispatch({
      type: `${modelName}/getLatestRecord`,
    }).then(() => {
      if (!this._isMounted) return
      this.interval = dealInterval(() => {
        this.getLatestRecord()
      })
    })
  }

  render() {
    const { model: { latest_records = [] }, RG, dispatch, modelName, loading } = this.props
    const columns = [
      {
        title: '时间',
        dataIndex: 'time',
        width: '25%',
        render: (value, record, index, dataSource) => (
           value
         // <Color record={record} dataSource={dataSource} >{value}</Color >
        )
      },
      {
        title: '方向',
        dataIndex: 'type',
        width: '20%',
        render: (value, record, index, dataSource) => {
          const v = value === '2' || value === '买' ? (
            <RedGreenSwitch.GreenText value='买入' />
          ) : (
            <RedGreenSwitch.RedText value='卖出' />
          )
          return (
            v
          )
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
            <RedGreenSwitch.RedGreenArrow style={style} alt='top' />) : (Number(value) < Number(next.price) ? (
            <RedGreenSwitch.RedGreenArrow style={style} alt='down' />) : null)
          const result = <span >{value}{img}</span >
          let v = record.type === '2' || record.type === '买' ? (
            <RedGreenSwitch.GreenText value={result} />
          ) : <RedGreenSwitch.RedText value={result} />
          return v
        }
      },
      {
        title: '数量(张)',
        dataIndex: 'amount',
        render: (value, record = {}) => {
          let v = <span style={{ color: record.exist === '1' ? COLORS.yellow : null }} >
            {value}
            </span >
          return v
        }
      },
    ]
    const dataSource = latest_records
    const tableProps = {
      className: styles.tableContainer,
      columns,
      dataSource: _.merge((new Array(18)).fill(), dataSource),
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

