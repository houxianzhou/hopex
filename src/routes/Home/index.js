import React, { Component } from 'react'
import { connect } from 'dva'
import { Mixin, ShowJsonTip } from '@components'
import { isEqual, _, parsePathSearch } from '@utils'
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
@connect(({ home: model, user, theme, loading, dispatch }) => ({
  model,
  user,
  modelName: 'home',
  theme,
  loading,
  dispatch,
}))
export default class View extends Component {

  componentDidUpdate(prevProps) {
    const { model: { marketCode: prevMarketCode } } = prevProps
    const { model: { marketCode }, dispatch, modelName } = this.props
    if (!isEqual(prevMarketCode, marketCode) && marketCode && prevMarketCode) {
      wss.closeAll().then(() => {
        dispatch({
          type: `${modelName}/clearState`,
        })
        this.startInit()
      })
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

  renderView = (name) => {
    const props = { ...this.props, that: this }
    const RenderItem = Comp[name]
    return <RenderItem {...props} />
  }

  render() {
    const { renderView } = this
    const { user: { userInfo } } = this.props
    const isLogin = !_.isEmpty(userInfo)
    return (
      <Mixin.Parent that={this} >
        <ShowJsonTip data={{ ...this.props.model, ...this.props.user }} ></ShowJsonTip >


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
                renderView('PersonEnsure')
              }
            </div >
          ) : null
        }
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
                renderView('RecentRecord')
              }
            </div >
          ) : null
        }

      </Mixin.Parent >
    )
  }
}

