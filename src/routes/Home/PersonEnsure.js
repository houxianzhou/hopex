import React, { Component } from 'react'
import { classNames, dealInterval, } from '@utils'
import { Table, Mixin, } from '@components'
import { SCROLLX, } from '@constants'
import ScrollPannel from './components/ScrollPanel'
import RedGreenSwitch from '@routes/Components/RedGreenSwitch'
import { RenderModal } from '@routes/Components/HistoryTable'
import styles from './index.less'


export default class PersonEnsure extends Component {
  startInit = () => {
    this.getPersonalEnsure()
  }

  getPersonalEnsure = (payload = {}) => {
    const { callback } = payload
    const { dispatch, modelName } = this.props
    dispatch({
      type: `${modelName}/getPersonalEnsure`,
      payload
    }).then((res) => {
        if (!this._isMounted || this.interval) return
        this.interval = dealInterval(() => {
          this.interval = null
          this.getPersonalEnsure()
        })
      }
    )
  }

  render() {
    const {
      model: { personalEnsures = [] }, modal: { name, data }, calculateTableHeight, expandedRowRender, noDataTip,
      dispatch, modelName, switchMarket, loading, openModal
    }
      = this.props
    const columns = [
      {
        title: '合约',
        dataIndex: 'marketName',
        render: (value, record = {}) => ({
          value: switchMarket(value, record.market),
          className: 'blue'
        })
      },
      {
        title: '类型',
        dataIndex: 'type',
        render: (value, record) => String(record.side) === '1' ? (
          <RedGreenSwitch.RedText value={record.sideDisplay} />
        ) : (
          <RedGreenSwitch.GreenText value={record.sideDisplay} />
        )
      },
      {
        title: '杠杆倍数',
        dataIndex: 'leverage',
        render: (value, record) => value
      },
      {
        title: '数量(张)',
        dataIndex: 'amount',
        render: (value, record) => String(record.side) === '1' ? (
          <RedGreenSwitch.RedText value={value} />
        ) : (
          <RedGreenSwitch.GreenText value={value} />
        )
      },
      {
        title: '委托价格',
        dataIndex: 'price',
        //render: (value) => value
      },
      {
        title: '成交数量(张)',
        dataIndex: 'dealAmount',
      },
      {
        title: '成交均价',
        dataIndex: 'avgDealMoney',
        //render: (v) => formatNumber(v, 'p')
      },
      {
        title: '委托占用保证金',
        dataIndex: 'delegateMoney',
        //render: (v) => formatNumber(v, 'p')
      },
      {
        title: '手续费',
        dataIndex: 'dealFee',
        //render: (v) => formatNumber(v, 'p')
      },
      {
        title: '委托时间',
        dataIndex: 'ctime',
        // render: (value) => value
      },
      {
        title: '状态',
        width: 130,
        dataIndex: 'orderStatusDisplay',
      },
      {
        title: '操作',
        dataIndex: 'amount',
        width: 150,
        render: (value, record = {}) => {
          return ({
              value: (
                <>
                  <span
                    onClick={(e) => {
                      e.stopPropagation()
                      dispatch({
                        type: `${modelName}/doCancelPersonEnsure`,
                        payload: {
                          market: record.market,
                          orderId: record.orderId
                        }
                      })
                    }} >
                    撤销
                  </span >
                  {
                    record.orderStatus === '1' ? (
                      <span onClick={(e) => {
                        e.stopPropagation()
                        openModal({
                          name: 'dealDetail',
                          data: record
                        })
                      }} >
                        成交明细
                  </span >
                    ) : null
                  }
                </>
              ),
              className: 'blue action'
            }
          )
        }
      },
    ]
    const dataSource = personalEnsures
    const tableProp = {
      className: styles.tableContainer,
      columns,
      dataSource: dataSource, //_.merge((new Array(4)).fill(), dataSource),
      onClickRow: (item) => {
        // console.log(item)
      },
      expandedRowRender,
      scroll: {
        x: SCROLLX.X,
      },
      noDataTip: () => noDataTip(dataSource, '当前无委托'),
      // loadingMore: (callback) => {
      //   this.getPersonalEnsure({callback})
      // }
    }

    return (
      <Mixin.Child that={this} >
        <div
          className={
            classNames(
              {
                view: true
              },
              styles.PersonEnsure
            )
          }
        >
          <ScrollPannel
            tableHeight={calculateTableHeight(dataSource)}
            header={
              <div className={styles.header} >
                <div >活跃委托</div >
                <div >* 委托有效期7天</div >
              </div >
            }
          >
            <Table {...tableProp} />

          </ScrollPannel >
          {
            name === 'dealDetail' ? (<RenderModal
              {...this.props}
              loading={loading.effects[`${modelName}/getOrderDetail`]}
              data={data}
              className={styles.detailModal} />) : null
          }
        </div >
      </Mixin.Child >
    )
  }
}

