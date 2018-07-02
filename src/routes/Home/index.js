import React, { Component } from 'react'
import { connect } from 'dva'
import { Mixin } from '@components'
import LatestRecord from './LatestRecord'
import styles from './index.less'


@connect(({ home: model, theme, loading, dispatch }) => ({
  model,
  theme
}))
export default class View extends Component {
  startInit() {
    console.log('父组件')
  }

  render() {
    const { theme: { dragIndex } } = this.props
    const Comp = {
      LatestRecord
    }
    return (
      <Mixin {...{ that: this }}>
        {
          dragIndex.map((item, index) => {
            const RenderItem = Comp[item]
            return <RenderItem key={index} />
          })
        }
      </Mixin >
    )
  }
}

