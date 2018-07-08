import React, { Component } from 'react'
import { connect } from 'dva'
import { Mixin, ShowJsonTip } from '@components'
import LatestRecord from './LatestRecord'
import TradeChart from './TradeChart'
import EnsureRecord from './EnsureRecord'
import Purse from './Purse'
import BuySell from './BuySell'
import CurrentContract from './CurrentContract'
import styles from './index.less'

const Comp = {
  LatestRecord,
  TradeChart,
  EnsureRecord,
  Purse,
  BuySell,
  CurrentContract
}
@connect(({ home: model, theme, loading, dispatch }) => ({
  model,
  modelName: 'home',
  theme,
  loading,
  dispatch,
}))
export default class View extends Component {
  constructor(props) {
    super(props)
    this.initStacks = []
  }

  startInit = () => {
    this.initStacks.map(item => item && item())
  }

  renderView = (name) => {
    const props = { ...this.props, initStacks: this.initStacks }
    const RenderItem = Comp[name]
    return <RenderItem {...props} />
  }

  render() {
    const { renderView } = this
    return (
      <Mixin.Parent that={this} >
        <ShowJsonTip data={this.props.model} ></ShowJsonTip >
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

      </Mixin.Parent >
    )
  }
}

