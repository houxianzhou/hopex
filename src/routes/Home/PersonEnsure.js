import React, { Component } from 'react'
import { classNames, moment, dealInterval, _, formatNumber } from '@utils'
import { Table, Mixin } from '@components'
import { SCROLLX, TABLE } from '@constants'
import ScrollPannel from './components/ScrollPanel'
import RedGreenSwitch from './components/RedGreenSwitch'
import styles from './index.less'


export default class View extends Component {
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
        if (callback) return callback()
        this.interval = dealInterval(() => {
          this.getPersonalEnsure(payload)
        })
      }
    )
  }

  render() {
    const { model: { personalEnsures = [], userInfo = {} }, calculateTableHeight, noDataTip, dispatch, modelName } = this.props
    const columns = [
      {
        title: '合约',
        dataIndex: 'market',
        render: (value, record) => ({
          value,
          className: 'blue'
        })
      },
      {
        title: '类型',
        dataIndex: 'type',
        render: (value, record) => String(record.side) === '1' ? (
          <RedGreenSwitch.RedText value={'卖'} />
        ) : (
          <RedGreenSwitch.GreenText value={'买'} />
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
        render: (value) => Number(value) >= 0 ? (
          <RedGreenSwitch.GreenText value={value} />
        ) : (
          <RedGreenSwitch.RedText value={value} />
        )
      },
      {
        title: '委托价格',
        dataIndex: 'price',
        render: (value) => formatNumber(value, 4)
      },
      {
        title: '成交数量(张)',
        dataIndex: 'amount',
        render: (value, record) => value - record.left
      },
      {
        title: '成交均价',
        dataIndex: 'avgDealMoney',
        render: (v) => formatNumber(v, 'p')
      },
      {
        title: '委托占用保证金',
        dataIndex: 'delegateMoney',
        render: (v) => formatNumber(v, 'p')
      },
      {
        title: '手续费',
        dataIndex: 'dealFee',
        render: (v) => formatNumber(v, 'p')
      },
      {
        title: '委托时间',
        dataIndex: 'ctime',
        render: (value) => value
      },
      {
        title: '状态',
        width: 100,
        dataIndex: 'orderStatus',
        render: (value) => value === '1' ? '部分成交' : '等待成交'
      },
      {
        title: '操作',
        dataIndex: 'amount',
        width: 150,
        render: (value, record) => {
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
                  <span onClick={(e) => {
                    e.stopPropagation()
                    dispatch({
                      type: `${modelName}/getPersonEnsureDetail`,
                      payload: {
                        market: record.market,
                        orderId: record.orderId
                      }
                    })
                  }} >
                    成交明细
                  </span >
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
      expandedRowRender: (record = {}) => {
        const { expand = [] } = record
        const columns = [
          {
            title: '成交时间',
            dataIndex: 'ctime',
            maxWidth: 200,
          },
          {
            title: '手续费',
            dataIndex: 'takefee',
          },
        ]
        return expand.length ? (
          <div style={{ height: calculateTableHeight(expand) }} >
            <Table
              className={styles.expandetableContainer}
              columns={columns}
              dataSource={expand}
              scroll={{
                bounce: false
              }}
            />
          </div >
        ) : null
      },
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
              <div >活跃委托</div >
            }
          >
            <Table {...tableProp} />

          </ScrollPannel >
        </div >
      </Mixin.Child >
    )
  }
}

