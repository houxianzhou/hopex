import React, { Component } from 'react'
import { connect } from 'dva'
import { Mixin } from '@components'
import LatestRecord from './LatestRecord'
import TradeChart from './TradeChart'
import EnsureRecord from './EnsureRecord'
import styles from './index.less'

const Comp = {
  LatestRecord,
  TradeChart,
  EnsureRecord
}
@connect(({ home: model, theme, loading, dispatch }) => ({
  model,
  theme
}))
export default class View extends Component {
  startInit() {
    console.log('父组件')
  }

  renderView = (name) => {
    const RenderItem = Comp[name]
    return <RenderItem />
  }

  render() {
    const { renderView } = this
    return (
      <Mixin {...{ that: this }}>
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
      </Mixin >
    )
  }
}

