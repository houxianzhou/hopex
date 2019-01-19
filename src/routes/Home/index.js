import React, { Component } from 'react'
import { connect } from 'dva'
import { Mixin, ShowJsonTip, Table, RouterGo } from '@components'
import { isEqual, _, parsePathSearch, } from '@utils'
import { PATH } from '@constants'
import wss from '@services/SocketClient'
import LatestRecord from './LatestRecord'
import TradeChart from './TradeChart'
import EnsureRecord from './EnsureRecord'
import Purse from './Purse'
import BuySell from './BuySell'
import CurrentContract from './CurrentContract'
import Position from './Position'
import PersonEnsure from './PersonEnsure'
import RecentRecord from './RecentRecord'
import NoDataTip from '@routes/Components/NoDataTip'
import styles from './index.less'


const Comp = {
  LatestRecord,
  TradeChart,
  EnsureRecord,
  Purse,
  BuySell,
  CurrentContract,
  Position,
  PersonEnsure,
  RecentRecord
}
let throttle
@connect(({ home: model, modal, user, theme, asset, Loading, dispatch }) => ({
  model,
  modal,
  user,
  asset,
  modelName: 'home',
  theme,
  loading: Loading,
  dispatch,
}))
export default class View extends Component {

  changeState = (payload) => {
    this.setState(payload)
  }

  componentDidUpdate(prevProps) {
    const { model: { marketCode: prevMarketCode } } = prevProps
    const { model: { marketCode }, dispatch, modelName } = this.props

    if (!isEqual(prevMarketCode, marketCode) && marketCode && prevMarketCode) {
      if (!throttle) {
        // 暂时失效,startInt自己会重新执行，这里不用再执行一遍了
        throttle = _.throttle(
          () => {
            // dispatch({
            //   type: `${modelName}/clearState`,
            // })
            // wss.closeAll(true).then((res) => {
            //   if (res) {
            //     // this.startInit()
            //     throttle = null
            //   }
            // }).catch((err) => {
            //   console.log('关闭失败')
            // })
          }, 1000)
        throttle()
      }
    }
  }

  startInit = () => {
    const { dispatch, modelName } = this.props
    dispatch({
      type: `${modelName}/clearState`,
    })
    wss.closeAll(true).then(() => {
      dispatch({
        type: `${modelName}/clearState`,
      })
      this.getAllMarkets().then((res) => {
        this.childInitStacks.map(item => item && item())
      })
    }).catch(() => {
      console.log('关闭失效----')
    })
  }

  getAllMarkets = () => {
    const { dispatch, modelName, location: { search } } = this.props
    return new Promise((resolve) => {
      setTimeout(() => {
        return dispatch({
          type: `${modelName}/getAllMarketDetails`,
          payload: {
            search: parsePathSearch(search).marketCode
          }
        }).then((res) => {
          this.getAllMarketsFromWs()
          resolve()
        })
      }, 500)
    })
  }

  getAllMarketsFromWs = () => {
    const { dispatch, modelName } = this.props
    const ws = wss.getSocket('ws')
    ws.onConnectPromise().then(() => {
      dispatch({
        type: `${modelName}/getAllMarketDetailsFromWs`,
      }).then(res => {
        if (res) {
          ws.listen({
            name: 'market.update',
            subscribe: (e, res) => {
              if (_.get(res, 'method') === 'market.update') {
                const result = _.get(res, 'data')
                dispatch({
                  type: `${modelName}/updateAllMarketDetails`,
                  payload: {
                    result,
                    request: 'ws'
                  }
                })
              }
            },
            unsubscribe: () => {
            },
            restart: () => {
              this.getAllMarketsFromWs()
            }
          })
        }
      })
    })
  }

  isLogin = () => {
    const { user: { userInfo } } = this.props
    return !_.isEmpty(userInfo)
  }

  routerGoLogin = (value) => {
    return <RouterGo.SwitchRoute value={PATH.login} >{value}</RouterGo.SwitchRoute >
  }

  routerGoRegister = (value) => {
    return <RouterGo.SwitchRoute value={PATH.register} >{value}</RouterGo.SwitchRoute >
  }

  renderView = (name) => {
    const { theme: { RG, viewPosition, calculateTableHeight, theme }, dispatch, modelName } = this.props

    const props = {
      ...this.props,
      theme,
      RG,
      viewPosition,
      calculateTableHeight,
      switchMarket: (value, marketCode) => {
        return <RouterGo.SwitchMarket {...this.props} value={value} marketCode={marketCode} />
      },
      openModal: (payload = {}) => {
        dispatch({
          type: `${modelName}/openModal`,
          payload
        })
      },
      closeModal: () => {
        dispatch({
          type: `${modelName}/closeModal`,
        })
      },
      noDataTip: (dataSource = [], text) => {
        if (!dataSource.length) {
          return <NoDataTip text={text} change={true} />
        }
      },
      expandedRowRender: (record = {}) => {
        const { expand = [] } = record
        const columns = [
          {
            title: '成交数量(张)',
            dataIndex: 'amount',
            maxWidth: 200,
          },
          {
            title: '成交价格',
            dataIndex: 'price',
            maxWidth: 200,
          },
          {
            title: '成交时间',
            dataIndex: 'time',
            maxWidth: 200,
          },
          {
            title: '手续费',
            dataIndex: 'fee',
          },
        ]
        return _.has(record, 'expand') ? (
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
      isLogin: this.isLogin(),
      routerGoLogin: this.routerGoLogin,
      routerGoRegister: this.routerGoRegister,
      that: this
    }
    const RenderItem = Comp[name]
    return <RenderItem {...props} />
  }

  render() {
    const { renderView } = this
    const { user: { userInfo }, theme: { viewPosition } } = this.props
    const isLogin = this.isLogin()
    return (
      <Mixin.Parent that={this} >
        <div className={styles.home} >
          {/*<ShowJsonTip data={{ ...this.props.model, ...this.props.user, ...this.props.theme }} ></ShowJsonTip >*/}

          <div className={styles.views} >
            {
              renderView('LatestRecord')
            }
            {
              renderView('TradeChart')
            }
            {
              renderView('EnsureRecord')
            }
          </div >

          <div className={styles.views} >
            {
              renderView('Purse')
            }
            {
              renderView('BuySell')
            }
            {
              renderView('CurrentContract')
            }
          </div >

          {
            isLogin ? (
              <div className={styles.views} >
                {
                  renderView('Position')
                }
              </div >
            ) : null
          }


          {
            isLogin ? (
              <div className={styles.views} >
                {
                  renderView('PersonEnsure')
                }
              </div >
            ) : null
          }

          {
            isLogin ? (
              <div className={styles.views} >
                {
                  renderView('RecentRecord')
                }
              </div >
            ) : null
          }

        </div >
      </Mixin.Parent >
    )
  }
}

