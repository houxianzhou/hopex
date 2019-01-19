import React, { Component } from 'react'
import { connect } from 'dva'
import { classNames, _, } from '@utils'
import { Table, PagiNation, Mixin } from '@components'
import { getColumns, Tabs, RenderModal, getTabs } from '@routes/Components/HistoryTable'
import NoDataTip from '@routes/Components/NoDataTip'

import styles from './index.less'

@connect(({ modal, Loading }) => ({
  modal,
  loading: Loading
}))
export default class View extends Component {
  state = {
    activeLi: '1',
    currentPage: 0,
    personalEnsureHistory: [],//最近10条委托历史
    personalEnsureHistoryTotal: 0,//页数
    deliveryHistory: [],//交割历史
    deliveryHistoryTotal: 0,
    highlevelHistory: [],//强平历史
    highlevelHistoryTotal: 0,
    reduceHistory: [],//减仓历史
    reduceHistoryTotal: 0,
  }

  componentDidMount() {
    this.startInit()
  }

  startInit = () => {
    // 暂时没有东西
    this.getHistory()
  }

  getHistory = () => {
    const { activeLi, currentPage } = this.state
    const { dispatch, modelName1 } = this.props

    dispatch({
      type: `${modelName1}/getHistory`,
      payload: {
        pageSize: 20,
        type: activeLi,
        page: currentPage + 1
      }
    }).then(res => {
      if (res) {
        this.changeState(
          {
            [res['historyList']]: res['result'],
            [`${res['historyList']}Total`]: res.total - 1
          }
        )
      }
    })
  }


  render() {
    const {
      activeLi,
      personalEnsureHistory,
      personalEnsureHistoryTotal,
      deliveryHistory,
      deliveryHistoryTotal,
      currentPage
    } = this.state
    const { changeState, getHistory } = this
    const {
      modal: { name, data }, openModal,
      calculateTableHeight, loading, modelName1
    } = this.props
    const columns = getColumns({
      ...this.props,
      columns: [
        {
          title: '合约',
          width: 120
        },
        {
          title: '类型',
          width: 60,
        },
        {
          title: '委托时间',
          width: 180
        },
        {
          title: '状态',
          // width: 100,
        },
        {
          title: '操作',
          width: 60,
          dataIndex: 'orderStatus',
          render: (value, record = {}) => {
            return ({
                value: (
                  ['1', '2'].indexOf(record.orderStatus) !== -1 ? (
                    <span onClick={(e) => {
                      openModal({
                        name: 'dealDetail',
                        data: record
                      })
                    }} >
                   成交明细
                  </span >
                  ) : null
                ),
                className: 'blue action'
              }
            )
          }
        },
      ]
    })

    let dataSource
    let totalPage
    switch (activeLi) {
      case '1':
        dataSource = personalEnsureHistory
        totalPage = personalEnsureHistoryTotal
        break
      case '3':
        dataSource = deliveryHistory
        totalPage = deliveryHistoryTotal
        break
      default:
        dataSource = []
        totalPage = 0
    }

    const tableProp = {
      loading: loading.effects[`${modelName1}/getHistory`],
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
          getHistory()
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
        <div
          className={
            classNames(
              styles.marketTradeHistory
            )
          }
        >
          <div className={styles.top} >
            <div className={styles.title} >合约交易历史</div >
            <div className={styles.desc} ><span >*</span >为保证系统性能，只保留最近60天的历史记录</div >
          </div >
          <div className={styles.header} >
            <ul >
              {
                getTabs(false).map((item, index) => (
                  <li key={index} className={classNames(
                    activeLi === item.type ? styles.active : null
                  )} onClick={() => {
                    changeState({
                      currentPage: 0,
                      activeLi: item.type
                    }, () => {
                      getHistory()
                    })
                  }} >{item.name}</li >
                ))
              }
            </ul >
          </div >
          {
            dataSource.length ? (
              <div style={{ height: calculateTableHeight(dataSource) }} >
                <Table {...tableProp} />
              </div >
            ) : (
              <div className={styles.defaultContainer} ><NoDataTip text={'当前无交易历史'} /></div >
            )
          }

          <div className={styles.pagenations} >
            <PagiNation {...pageProp} />
          </div >
          {
            name === 'dealDetail' ? (<RenderModal
              {...this.props}
              data={data}
              loading={loading.effects[`${modelName1}/getOrderDetail`]}
              className={styles.detailModal}
              style={{ background: '#F6F8FA' }}
            />) : null
          }
        </div >
      </Mixin.Child >
    )
  }
}


