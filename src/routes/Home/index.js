import React, { Component } from 'react'
import { connect } from 'dva'
import { Mixin, ShowJsonTip, Toast, Table } from '@components'
import { isEqual, _, parsePathSearch, localSave } from '@utils'
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
import defaultpng from '@assets/default.png'
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
@connect(({ home: model, modal, user, theme, loading, dispatch }) => ({
  model,
  modal,
  user,
  modelName: 'home',
  theme,
  loading,
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
        throttle = _.throttle(
          () => {
            wss.closeAll().then((res) => {
              dispatch({
                type: `${modelName}/clearState`,
              })
              this.startInit()
              throttle = null
            }).catch((err) => {
              console.log('关闭失败')
            })
          }, 1000)
        throttle()
      }
    }
  }

  startInit = () => {
    this.getAllMarkets().then((res) => {
      this.childInitStacks.map(item => item && item())
    })
  }

  getAllMarkets = () => {
    const { dispatch, modelName, model: { marketList = [] }, location: { search } } = this.props
    if (_.isEmpty(marketList)) {
      return dispatch({
        type: `${modelName}/getAllMarkets`,
        payload: {
          search: parsePathSearch(search).marketCode
        }
      })
    }
    return Promise.resolve()
  }

  isLogin = () => {
    const { user: { userInfo } } = this.props
    return !_.isEmpty(userInfo)
  }

  routerGoLogin = () => {
    const { dispatch, modelName } = this.props
    dispatch({
      type: `${modelName}/routerGo`,
      payload: PATH.login
    })
  }

  routerGoRegister = () => {
    const { dispatch, modelName } = this.props
    dispatch({
      type: `${modelName}/routerGo`,
      payload: PATH.register
    })
  }

  renderView = (name) => {
    const { theme: { RG, viewPosition, calculateTableHeight } } = this.props
    const props = {
      RG,
      viewPosition,
      calculateTableHeight,
      noDataTip: (dataSource = [], text) => {
        if (!dataSource.length) {
          return <div >
            <img src={defaultpng} />
            <div style={{ marginTop: 8 }} >{text}</div >
          </div >
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
            title: '成交价格(张)',
            dataIndex: 'amount',
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
      ...this.props,
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
          <ShowJsonTip data={{ ...this.props.model, ...this.props.user, ...this.props.theme }} ></ShowJsonTip >

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

