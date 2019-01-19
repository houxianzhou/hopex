import React, { Component } from 'react'
import { connect } from 'dva'
import { NavPannel } from '@components'
import { default as ContractExplain } from './ContractExplain.js'
import { default as ExchangeGuide } from './ExchangeGuide.js'
import { default as Settlement } from './Settlement.js'
import { default as MoneyTerms } from './MoneyTerms.js'
import { default as ClosePosition } from './ClosePosition.js'
import { default as ForwardContractCalculate } from './ForwardContractCalculate.js'
import { default as ReverseContractCalculate } from './ReverseContractCalculate.js'
import { default as InsuranceFund } from './InsuranceFund.js'

import { assetManage, $B3, $B4, exchange, contract, caculator } from '@assets'

const Comp = {
  ContractExplain,
  ExchangeGuide,
  Settlement,
  MoneyTerms,
  ClosePosition,
  ForwardContractCalculate,
  ReverseContractCalculate,
  InsuranceFund
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
    // console.log(this.props)
    const { renderPage } = this;
    const { history } = this.props;
    return (
      <div >
        <NavPannel
          {...this.props}
          defaultActive='ContractExplain'
          navList={[
            {
              svg: contract,
              title: '合约相关',
              list: [
                {
                  name: 'ContractExplain',
                  title: '合约详解',
                  onClick: () => {
                    return renderPage('ContractExplain')
                  }
                },
              ]
            },
            {
              svg: exchange,
              title: '交易所相关',
              list: [
                {
                  name: 'ExchangeGuide',
                  title: '交易所指南',
                  onClick: () => {
                    return renderPage('ExchangeGuide')
                  }
                },
                {
                  name: 'MoneyTerms',
                  title: '资金相关术语',
                  onClick: () => {
                    return renderPage('MoneyTerms')
                  }
                },
                {
                  name: 'ClosePosition',
                  title: '强制平仓&自动减仓',
                  onClick: () => {
                    return renderPage('ClosePosition')
                  }
                },
                {
                  name: 'InsuranceFund',
                  title: '保险基金',
                  onClick: () => {
                    return renderPage('InsuranceFund')
                  }
                }
              ]
            },
            {
              svg: caculator,
              title: '交易合约计算示例',
              list: [
                {
                  name: 'ReverseContractCalculate',
                  title: '反向合约计算示例',
                  onClick: () => {
                    return renderPage('ReverseContractCalculate')
                  }
                },
                {
                  name: 'ForwardContractCalculate',
                  title: '正向合约计算示例',
                  onClick: () => {
                    return renderPage('ForwardContractCalculate')
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
