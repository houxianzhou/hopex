import React, { Component } from 'react'
import { connect } from 'dva'
import { COLORS } from "@constants"
import { Mixin, Table } from '@components'
import { classNames, _, } from '@utils'

import styles from './index.less'

@connect(({ modal, Loading }) => ({
  modal,
  loading: Loading
}))
export default class View extends Component {
  componentDidMount() {
    this.startInit()
  }

  startInit = () => {
    const { dispatch, modelName } = this.props
    dispatch({
      type: `${modelName}/getAssetRecord`,
      payload: {
        page: '1'
      }
    })
  }


  render() {
    const { calculateTableHeight } = this.props
    const columns = [
      {
        title: '时间',
        dataIndex: 'time',
        width: 100
      },
      {
        title: '类型',
        dataIndex: 'type',
        width: 10
      },
      {
        title: '金额',
        dataIndex: 'money',
        width: 40
      },
      {
        title: '地址',
        dataIndex: 'address',
      },
      {
        title: 'TxHash',
        dataIndex: 'hash',
      },
      {
        title: '状态',
        dataIndex: 'status',
        width: 30
      },
    ]
    const dataSource = (new Array(10)).fill().map(() => (
      {
        time: '2018-05-13 14:23:12',
        type: '提现',
        money: '0.00200000ETH',
        address: '158NjzVvPC8vHrq41NvRJYSyW72XoszUL9',
        hash: 'XXXXXXXXXXXXXXXXXXXXX',
        status: '进行中'
      }
    ))
    const tableProp = {
      className: styles.tableContainer,
      columns,
      dataSource: dataSource,
    }
    return (
      <Mixin.Child that={this} >
        <div className={styles.assetrecord} >
          <div className={styles.title} >资金记录</div >
          <div style={{ height: calculateTableHeight(dataSource) }} className={styles.tablec} >
            <Table {...tableProp} />
          </div >

        </div >
      </Mixin.Child >
    )
  }
}


