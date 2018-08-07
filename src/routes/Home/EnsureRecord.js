import React, { Component } from 'react'
import { classNames, _, dealInterval, getPercent, formatNumber, isEqual } from '@utils'
import { Mixin, Table } from "@components"
import ensure from '@assets/ensure.png'
import { COLORS } from '@constants'
import ScrollPannel from './components/ScrollPanel'
import ColorChange from './components/ColorChange'
import RedGreenSwitch from './components/RedGreenSwitch'
import styles from './index.less'

let max = null

export default class View extends Component {

  componentDidUpdate(prevProps) {
    const { model: { latestPrice: prevLatestPrice } } = prevProps
    const { model: { latestPrice }, dispatch, modelName } = this.props
    if (!isEqual(prevLatestPrice, latestPrice)) {
      const result = latestPrice > prevLatestPrice ? 1 : 0
      dispatch({
        type: `${modelName}/changeState`,
        payload: {
          latestPriceTrend: result
        }
      })
    }
  }

  startInit = () => {
    this.getEnsureRecord()
  }

  getEnsureRecord = () => {
    const { dispatch, modelName } = this.props
    dispatch({
      type: `${modelName}/getEnsureRecord`,
      payload: {
        mode: 'http'
      }
    }).then(res => {
      this.interval = dealInterval(() => {
        this.getEnsureRecord()
      })
    })
  }

  render() {
    const { model: { ensure_records = [], latestPrice, indexPrice, equitablePrice, latestPriceTrend }, dispatch, modelName, RG } = this.props
    const [dataTop = [], dataDown = []] = [
      _.get(ensure_records, 'asks')
      , _.get(ensure_records, 'bids')
    ]


    const columns = [
      {
        title: '价格',
        dataIndex: 'price',
        render: (value, record) => {
          let v = formatNumber(value, 'p')
          return record.type === '1' ?<RedGreenSwitch.RedText value={v} />:<RedGreenSwitch.GreenText value={v} />
          // return record.type === '1' ? {
          //   value: v,
          //   className: 'red'
          // } : {
          //   value: v,
          //   className: 'green'
          // }
        }
      },
      {
        title: '数量(张)',
        dataIndex: 'amount',
        render: (value, record = {}, index, dataSource) => {
          return (
            <ColorChange
              data={{
                dataIndex: record.price,
                dataValue: value
              }}
              total={dataSource.map((item = {}) => ({
                dataIndex: item.price,
                dataValue: item.amount
              }))}
              RG={RG}
            >
              <span style={{
                color: record.exist === '1' ? COLORS.yellow : null
              }} >
                {formatNumber(value, 0, true)}
                </span >
            </ColorChange >
          )
        }
      },
      {
        title: '累计数量(张)',
        dataIndex: 'sum',
        render: (value, record = {}) => {
          return <ColorChange color={record.type === '1' ? COLORS.redOpacity : COLORS.greenOpacity}
                              percent={getPercent(value, max.sum, 0.02)} >
            <span style={{
              color: record.exist === '1' ? COLORS.yellow : null
            }} >
                {formatNumber(value, 0, true)}
                </span >
          </ColorChange >
        }
      }
    ]


    const tableProps = {
      className: styles.tableContainer,
      columns,
    }


    // const tableTopProps = {
    //   ...tableProps,
    //   dataSource: (new Array((8 - dataTop.length) > 0 ? (8 - dataTop.length) : 0)).fill().concat(dataTop.slice(0, 8).map((item, index) => {
    //     item.type = 'sell'
    //     item.sum = _.sumBy(dataTop.slice(index, 8), ({ amount } = 0) => amount)
    //     return item
    //   }))
    // }

    const onClickRow = (item) => {
      dispatch({
        type: `${modelName}/changeState`,
        payload: {
          clickSelectOne: item
        }
      })
    }

    const tableTopProps = {
      ...tableProps,
      dataSource: (new Array((8 - dataTop.length) > 0 ? (8 - dataTop.length) : 0)).fill().concat(dataTop.slice(0, 8)),
      onClickRow
    }

    // const tableDownProps = {
    //   ...tableProps,
    //   dataSource: _.merge((new Array(8)).fill(), dataDown.slice(0, 8).map((item, index) => {
    //     item.type = 'buy'
    //     item.sum = _.sumBy(dataDown.slice(0, index + 1), ({ amount }) => amount)
    //     return item
    //   }))
    // }

    const tableDownProps = {
      ...tableProps,
      dataSource: _.merge((new Array(8)).fill(), dataDown.slice(0, 8)),
      onClickRow
    }

    max = _.maxBy([...tableTopProps.dataSource, ...tableDownProps.dataSource], ({ sum } = {}) => sum)

    return (
      <Mixin.Child that={this} >
        <div
          className={
            classNames(
              {
                view: true
              },
              styles.ensureRecord
            )
          }
        >
          <ScrollPannel
            header={
              <div className={styles.ensurerecord_header} >
                <span >委托列表</span >
              </div >
            }
          >
            <div className={styles.content} >
              <div className={styles.top} >
                <Table {...tableTopProps} />
              </div >
              <div className={styles.center} >
                <div className={styles.left} >
                  {latestPrice}
                  {
                    latestPriceTrend ? (
                      <RedGreenSwitch.RedGreenArrow alt='top'  />
                    ) : (
                      <RedGreenSwitch.RedGreenArrow alt='down'  />
                    )
                  }
                </div >
                <div className={styles.right} >
                  <img alt='ensure' className={styles.ensure} src={ensure} />
                  {indexPrice}/{equitablePrice || null}
                </div >
              </div >
              <div className={styles.down} >
                <Table {...tableDownProps} />
              </div >
            </div >
          </ScrollPannel >
        </div >
      </Mixin.Child >
    )
  }
}

