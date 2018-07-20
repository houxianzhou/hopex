import React, { Component } from 'react'
import { connect } from 'dva'
import { Mixin, ShowJsonTip } from '@components'
import { isEqual, _ } from '@utils'
import wss from '@services/SocketClient'
import LatestRecord from './LatestRecord'
import TradeChart from './TradeChart'
import EnsureRecord from './EnsureRecord'
import Purse from './Purse'
import BuySell from './BuySell'
import CurrentContract from './CurrentContract'
import Position from './Position'
import PersonEnsure from './PersonEnsure'
import styles from './index.less'

const Comp = {
  LatestRecord,
  TradeChart,
  EnsureRecord,
  Purse,
  BuySell,
  CurrentContract,
  Position,
  PersonEnsure
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
    const { model: { market: prevMarket } } = prevProps
    const { model: { market }, dispatch, modelName } = this.props
    if (!isEqual(prevMarket, market) && market && prevMarket) {
      wss.closeAll().then(() => {
        // dispatch({
        //   type: `${modelName}/clearState`,
        // })
        setTimeout(() => {
          this.startInit()
        }, 500)
      })
    }
  }

  startInit = () => {
    this.getAllMarkets().then(() => {
      this.childInitStacks.map(item => item && item())
    })
  }

  getAllMarkets = () => {
    const { dispatch, modelName, model: { marketList = [] } } = this.props
    if (_.isEmpty(marketList)) {
      return dispatch({
        type: `${modelName}/getAllMarkets`,
        payload: {}
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
    return (
      <Mixin.Parent that={this} >
        <ShowJsonTip data={{ ...this.props.model, ...this.props.user }} ></ShowJsonTip >
        <div className={styles.views} >
          {
            renderView('Position')
          }
        </div >
        <div className={styles.views} >
          {
            renderView('PersonEnsure')
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

      </Mixin.Parent >
    )
  }
}

