import React, { Component } from 'react'
import { connect } from 'dva'
import { NavPannel } from '@components'
import { default as MarketTrade } from './MarketTrade'


const Comp = {
  MarketTrade
}
@connect(({ user, history: model, loading, dispatch }) => ({
  model,
  user,
  modelName: 'history',
  dispatch
}))
export default class View extends Component {

  renderPage = (page, props = {}) => {
    const Props = {
      ...this.props,
      ...props
    }
    const RenderItem = Comp[page]
    return <RenderItem {...Props} />
  }

  render() {
    const { renderPage } = this
    const { dispatch, modelName } = this.props
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
                    dispatch({
                      type: `${modelName}/changeState`,
                      payload: {
                        marketTradePage: 1
                      }
                    })
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
