import RedGreenSwitch from '@routes/Home/components/RedGreenSwitch'
import { Button } from '@components'
import { _ } from '@utils'
import SwitchMarket from '../Components/SwitchMarket'

export const Tabs = [
  {
    name: '最近10条委托历史',
    type: '1'
  },
  {
    name: '最近10条交割历史',
    type: '3'
  },
  {
    name: '最近10条强平历史',
    type: '4'
  },
  {
    name: '最近10条自动减仓历史',
    type: '5'
  }
]

export const getColumns = (props = {}) => {
  const { dispatch, modelName, columns = [] } = props
  const cols = [
    {
      title: '合约',
      dataIndex: 'marketName',
      render: (value, record) => (
        {
          value: <SwitchMarket value={value} marketCode={record.market} {...props} />,
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
      render: (value, record = {}) => String(record.side) === '1' ? (
        <RedGreenSwitch.RedText value={value} />
      ) : (
        <RedGreenSwitch.GreenText value={value} />
      )
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
              ['1', '2'].indexOf(record.orderStatus) > 0 ? (
                <span onClick={(e) => {
                  e.stopPropagation()
                  dispatch({
                    type: `${modelName}/getPersonEnsureDetail`,
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
