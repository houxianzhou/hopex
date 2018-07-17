import React, { Component } from 'react'
import { connect } from 'dva'
import { Mixin, ShowJsonTip } from '@components'
import { isEqual } from '@utils'
import wss from '@services/SocketClient'
import LatestRecord from './LatestRecord'
import TradeChart from './TradeChart'
import EnsureRecord from './EnsureRecord'
import Purse from './Purse'
import BuySell from './BuySell'
import CurrentContract from './CurrentContract'
import Position from './Position'
import styles from './index.less'

const Comp = {
  LatestRecord,
  TradeChart,
  EnsureRecord,
  Purse,
  BuySell,
  CurrentContract,
  Position
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
  constructor(props) {
    super(props)
  }

  componentDidUpdate(prevProps) {
    const { model: { market: prevMarket } } = prevProps
    const { model: { market } } = this.props
    if (!isEqual(prevMarket, market)) {
      wss.closeAll().then(() => {
        console.log('promise全部结束')
      })
      // setTimeout(() => {
      //   this.startInit()
      // }, 500)
    }
  }

  startInit = () => {
    this.childInitStacks.map(item => item && item())
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

