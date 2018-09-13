import React, { Component } from 'react'
import { connect } from 'dva'
import { NavPannel } from '@components'
import { default as ContractExplain } from './ContractExplain.js'
import { default as ExchangeGuide } from './ExchangeGuide.js'

import { assetManage, $B3, $B4 } from '@assets'

const Comp = {
  ContractExplain,
  ExchangeGuide
}
@connect(({ theme, question, loading, dispatch }) => ({
  model: question,
  theme,
  modelName: 'question',
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
          defaultActive='ContractExplain'
          navList={[
            {
              svg: assetManage,
              title: '合约相关',
              list: [
                {
                  name: 'ContractExplain',
                  title: '合约详解',
                  onClick: () => {
                    return renderPage('ContractExplain')
                  }
                }
              ]
            },
            {
              svg: assetManage,
              title: '交易所相关',
              list: [
                {
                  name: 'ExchangeGuide',
                  title: '交易所指南',
                  onClick: () => {
                    return renderPage('ExchangeGuide')
                  }
                }
              ]
            },
          ]}
        />
      </div >
    )
  }
}
