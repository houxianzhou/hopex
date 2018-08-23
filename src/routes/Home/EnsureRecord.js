import React, { Component } from 'react'
import { classNames, _, dealInterval, getPercent, formatNumber, isEqual } from '@utils'
import { Mixin, Table } from "@components"
import wss from '@services/SocketClient'
import ensure from '@assets/ensure.png'
import { triangle } from '@assets'
import { COLORS } from '@constants'
import ScrollPannel from './components/ScrollPanel'
import ColorChange from './components/ColorChange'
import RedGreenSwitch from './components/RedGreenSwitch'
import styles from './index.less'

let max = null

export default class View extends Component {
  state = {
    dis: ''
  }

  changeState = (payload = {}) => {
    this.setState(payload)
  }
  // 趋势改为后端写,转移到K线详情
  // componentDidUpdate(prevProps) {
  //   const { model: { latestPrice: prevLatestPrice } } = prevProps
  //   const { model: { latestPrice }, dispatch, modelName } = this.props
  //   if (!isEqual(prevLatestPrice, latestPrice)) {
  //     const result = Number(latestPrice) > Number(prevLatestPrice) ? 1 : 0
  //     dispatch({
  //       type: `${modelName}/changeState`,
  //       payload: {
  //         latestPriceTrend: result
  //       }
  //     })
  //   }
  // }

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
      if (res) {
        if (!this._isMounted) return
        this.interval = dealInterval(() => {
          this.getEnsureRecord()
        })

        // this.getEnsureRecordFromWs()
      }
    })
  }

  getEnsureRecordFromWs = () => {
    const { dispatch, modelName } = this.props
    const ws = wss.getSocket('ws')
    ws.onConnectPromise().then(() => {
      dispatch({
        type: `${modelName}/getEnsureRecordFromWs`,
      }).then(res => {
        if (res) {
          ws.listen({
            name: 'deals.subscribe',
            subscribe: (e, res) => {
              console.log(res, 'ppppppppppppp')
              if (_.get(res, 'method') === 'orderbook.update') {
                const result = _.get(res, 'data')
                // dispatch({
                //   type: `${modelName}/updateLatestRecord`,
                //   payload: {
                //     result,
                //     request: 'ws'
                //   }
                // })
              }
            },
            unsubscribe: () => {
            },
            restart: () => {
            }
          })
        }
      })
    })
  }

  render() {
    const { dis } = this.state
    const { changeState } = this
    const { model: { ensure_records = [], latestPrice = '', latestPriceShown = '', indexPrice = '', reasonablePrice = '', latestPriceTrend = '', varyRange = '' }, dispatch, modelName, loading, RG } = this.props
    const [dataTop = [], dataDown = []] = [
      _.get(ensure_records, 'asks')
      , _.get(ensure_records, 'bids')
    ]

    let varyRanges = _.isString(varyRange) ? varyRange.split(' ') : []
    const showDis = varyRanges.indexOf(dis) > 0 ? dis : varyRanges[0]


    const columns = [
      {
        title: '价格',
        dataIndex: 'price',
        render: (value, record) => {
          return record.type === '1' ? (
            <RedGreenSwitch.RedText value={value} />
          ) : (
            <RedGreenSwitch.GreenText value={value} />
          )
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
                {record.amountShow}
                </span >
            </ColorChange >
          )
        }
      },
      {
        title: '累计数量(张)',
        dataIndex: 'sum',
        render: (value, record = {}) => {
          return <ColorChange
            color={record.type === '1' ? RedGreenSwitch.SwitchColor(COLORS.redOpacity, COLORS.greenOpacity, RG) : RedGreenSwitch.SwitchColor(COLORS.greenOpacity, COLORS.redOpacity, RG)}
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
            loading={loading.effects[`${modelName}/getEnsureRecord`] && _.isEmpty(ensure_records)}
            header={
              <div className={styles.ensurerecord_header} >
                <div >委托列表</div >
                <div className={styles.distance} >
                  <div className={styles.text} >区间</div >
                  <div className={styles.number} >{showDis}</div >
                  {triangle}
                  <div className={styles.select} >
                    <ul >
                      {
                        varyRanges.map((item, index) => {
                          if (item !== showDis) {
                            return (
                              <li key={index} onClick={() => {
                                changeState({
                                  dis: item
                                })
                              }} >{item}</li >
                            )
                          }
                        })
                      }
                    </ul >
                  </div >
                </div >
              </div >
            }
          >
            <div className={styles.content} >
              <div className={styles.top} >
                <Table {...tableTopProps} />
              </div >
              <div className={styles.center} >
                <div className={styles.left} >
                  {
                    (/\+/.test(latestPrice)) ? (
                      <RedGreenSwitch.GreenText
                        value={latestPriceShown} />
                    ) : (
                      <RedGreenSwitch.RedText
                        value={latestPriceShown} />
                    )
                  }

                  <RedGreenSwitch.RedGreenArrow style={{ marginLeft: 10 }} alt={
                    latestPriceTrend !== '' ? (latestPriceTrend ? 'top' : 'down') : null
                  } />
                </div >
                <div className={styles.right} >
                  <img alt='ensure' className={styles.ensure} src={ensure} />
                  {indexPrice}/{reasonablePrice}
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

