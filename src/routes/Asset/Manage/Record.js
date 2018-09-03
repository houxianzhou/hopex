import React, { Component } from 'react'
import { connect } from 'dva'
import { COLORS } from "@constants"
import { Mixin, Table, PagiNation } from '@components'
import { classNames, _, } from '@utils'

import styles from './index.less'

@connect(({ modal, Loading, asset }) => ({
  modal,
  loading: Loading,
  model: asset
}))
export default class View extends Component {
  state = {
    currentPage: 0
  }

  componentDidMount() {
    this.startInit()
  }

  startInit = () => {
    this.getAssetRecord()
  }

  getAssetRecord = () => {
    const { dispatch, modelName } = this.props
    const { currentPage } = this.state
    dispatch({
      type: `${modelName}/getAssetRecord`,
      payload: {
        page: currentPage + 1
      }
    })
  }


  render() {
    const { changeState, getAssetRecord } = this
    const { calculateTableHeight, model: { record = [], recordTotalPage: totalPage = 1 } = {} } = this.props
    const { currentPage } = this.state
    const columns = [
      {
        title: '时间',
        dataIndex: 'createdTime',
        width: 100
      },
      {
        title: '类型',
        dataIndex: 'type',
        width: 10
      },
      {
        title: '金额',
        dataIndex: 'amount',
        width: 40
      },
      {
        title: '地址',
        dataIndex: 'addrUrl',
      },
      {
        title: 'TxHash',
        dataIndex: 'txidUrl',
      },
      {
        title: '状态',
        dataIndex: 'status',
        width: 30
      },
    ]
    const dataSource = record
    const tableProp = {
      className: styles.tableContainer,
      columns,
      dataSource: dataSource,
    }

    const pageProp = {
      total: totalPage,
      currentPage,
      onPageChange: (e) => {
        changeState({
          currentPage: e
        }, () => {
          getAssetRecord()
        })
      },
      containerClassName: styles.paginationcontainerClassName,
      pageClassName: 'paginationpageClassName',
      activeClassName: 'paginationpageActiveClassName',
      previousClassName: 'paginationpageClassName',
      nextClassName: 'paginationpageClassName',
    }
    return (
      <Mixin.Child that={this} >
        <div className={styles.assetrecord} >
          <div className={styles.title} >资金记录</div >
          <div style={{ height: calculateTableHeight(dataSource) }} className={styles.tablec} >
            <Table {...tableProp} />
          </div >
          <div className={styles.pagenations} >
            <PagiNation {...pageProp} />
          </div >

        </div >
      </Mixin.Child >
    )
  }
}


