import React, { Component } from 'react'
import { connect } from 'dva'
import { Mixin } from '@components'
import LatestRecord from './LatestRecord'
// import styles from './index.less'

const Comp = {
  LatestRecord
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
        <div >
          {
            renderView('LatestRecord')
          }
        </div >
      </Mixin >
    )
  }
}

