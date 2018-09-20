import React, { Component } from 'react'
import MainModal from '@routes/Components/MainModal'
import { Button, Table, Loading, RouterGo } from '@components'
import { _, classNames } from '@utils'
import RedGreenSwitch from './RedGreenSwitch'
import * as styles from './HistoryTable.less'

export const Tabs = [
  {
    name: '最近10条委托历史',
    type: '1'
  },
  {
    name: '最近10条强平历史',
    type: '6'
  },
  {
    name: '最近10条自动减仓历史',
    type: '7'
  }
]

export const getTabs = (isTen = true) => {
  const symbo = isTen ? '10条' : ''

  const Tabs = [
    {
      name: `最近${symbo}委托历史`,
      type: '1'
    },
    {
      name: `最近${symbo}强平历史`,
      type: '6'
    },
    {
      name: `最近${symbo}自动减仓历史`,
      type: '7'
    }
  ]

  return Tabs

}

export const getColumns = (props = {}) => {
  const { dispatch, modelName, columns = [] } = props
  const cols = [
    {
      title: '合约',
      dataIndex: 'marketName',
      render: (value, record) => (
        {
          value: <RouterGo.SwitchMarket value={value} marketCode={record.market} {...props} />,
          className: 'blue'
        }
      )
    },
    {
      title: '类型',
      dataIndex: 'side',
      render: (value) => value === '1' ? (
        <RedGreenSwitch.RedText value={'卖出'} />
      ) : (
        <RedGreenSwitch.GreenText value={'买入'} />
      )
    },
    {
      title: '杠杆倍数',
      dataIndex: 'leverage',
    },
    {
      title: '数量(张)',
      dataIndex: 'amount',
      render: (value, record = {}) => <RedGreenSwitch.MarkText mark={value} value={value.replace(/['+']/, '')} />
    },
    {
      title: '委托价格',
      dataIndex: 'price',
    },
    {
      title: '成交数量(张)',
      dataIndex: 'dealAmount',
    },
    {
      title: '成交均价',
      dataIndex: 'avgDealMoney',
    },
    {
      title: '平仓盈亏',
      dataIndex: 'unwindProfit',
    },
    {
      title: '手续费',
      dataIndex: 'dealFee',
    },
    {
      title: '委托时间',
      dataIndex: 'ctime',
    },
    {
      title: '状态',
      dataIndex: 'orderStatus',
      render: (v) => {
        let result
        switch (v) {
          case '0':
            result = '未知状态'
            break
          case '1':
            result = '部分成交，已撤销'
            break
          case '2':
            result = '完全成交'
            break
          case '3':
            result = '已撤销'
        }
        return result
      }
    },
    {
      title: '操作',
      dataIndex: 'orderStatus',
      render: (value, record = {}) => {
        return ({
            value: (
              ['1', '2'].indexOf(record.orderStatus) !== -1 ? (
                <span onClick={(e) => {
                  e.stopPropagation()
                  dispatch({
                    type: `${modelName}/getOrderDetail`,
                    payload: {
                      type: '1',
                      market: record.market,
                      orderId: record.orderId
                    }
                  })
                }} >
                    <Button loading={record.loading} layer={false} loadingSize={16} >
                          成交明细
                        </Button >
                  </span >
              ) : null

            ),
            className: 'blue action'
          }
        )
      }
    },
  ]
  columns.map((item = {}) => {
    const filterOne = _.findIndex(cols, (one = {}) => String(one.title) === String(item.title))
    if (filterOne !== -1) {
      cols.splice(filterOne, 1, {
        ...cols[filterOne],
        ...item
      })
    } else {
      cols.push(item)
    }
  })
  return cols
}


export class RenderModal extends Component {
  state = {
    dataSource: []
  }

  componentDidMount() {
    const { dispatch, data: record = {} } = this.props
    dispatch({
      type: `home/getOrderDetail`,
      payload: {
        side: record.side,
        market: record.market,
        orderId: record.orderId
      }
    }).then(res => {
      if (res) {
        this.setState({
          dataSource: res
        })
      }
    })
  }

  render() {
    const { className, style = {}, loading = false } = this.props
    const props = {
      ...this.props,
      title: '成交明细',
      modalProps: {
        style: {
          width: 1000
        }
      },
      className: styles.dealDetail
    }

    const columns = [
      {
        title: '成交数量(张)',
        dataIndex: 'amount',
        render: (value, record) => (
          <RedGreenSwitch.MarkText mark={value} value={value.replace(/['+']/, '')} />
        )
      },
      {
        title: '成交价格',
        dataIndex: 'price',
        // maxWidth: 200,
      },
      {
        title: '成交时间',
        dataIndex: 'time',
        // maxWidth: 200,
      },
      {
        title: '手续费',
        dataIndex: 'fee',
      },
    ]

    const dataSource = this.state.dataSource

    const tableProps = {
      className: classNames(
        styles.tableContainer,
        className
      ),
      columns,
      dataSource,
      scroll: {
        mouseWheel: true,
        scrollY: true
      },
    }

    return (
      <MainModal {...props}>
        <div className={styles.tablecr} style={style} >
          <Table {...tableProps} />
          {
            loading ? (
              <Loading.Circle loading={loading} isGlobal color={'white'} backgroundOpacity={0.1} />
            ) : null
          }
        </div >
      </MainModal >
    )
  }
}
