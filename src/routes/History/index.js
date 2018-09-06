import React, { Component } from 'react'
import { connect } from 'dva'
import { NavPannel } from '@components'
import { history } from '@assets'
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
    const { theme: { calculateTableHeight }, dispatch, modelName } = this.props
    const Props = {
      calculateTableHeight,
      ...this.props,
      ...props,
      openModal: (payload = {}) => {
        dispatch({
          type: `${modelName}/openModal`,
          payload
        })
      },
      closeModal: () => {
        dispatch({
          type: `${modelName}/closeModal`,
        })
      },
    }
    const RenderItem = Comp[page]
    return <RenderItem {...Props} />
  }

  open = (payload = {}) => {
    const { dispatch, modelName } = this.props
    dispatch({
      type: `${modelName}/openModal`,
      payload
    })
  }

  render() {
    const { renderPage } = this
    return (
      <div >
        <NavPannel
          defaultActive='marketTradeHistory'
          navList={[
            {
              svg: history,
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
