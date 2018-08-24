import React, { Component } from 'react'
import { connect } from 'dva'
import { NavPannel } from '@components'
import { default as MarketTrade } from './MarketTrade'

const Comp = {
  MarketTrade
}
@connect(({ home, theme, modal, history: model, loading, dispatch }) => ({
  model,
  home,
  theme,
  modal,
  modelName: 'history',
  modelName1: 'home',
  dispatch
}))
export default class View extends Component {

  renderPage = (page, props = {}) => {
    const { theme: { calculateTableHeight } } = this.props
    const Props = {
      calculateTableHeight,
      ...this.props,
      ...props
    }
    const RenderItem = Comp[page]
    return <RenderItem {...Props} />
  }

  render() {
    const { renderPage } = this
    return (
      <div >
        <NavPannel
          defaultActive='marketTradeHistory'
          navList={[
            {
              title: '历史',
              list: [
                {
                  name: 'marketTradeHistory',
                  title: '合约历史交易',
                  onClick: () => {
                    return renderPage('MarketTrade')
                  }
                }
              ]
            }
          ]}
        />
      </div >
    )
  }
}
