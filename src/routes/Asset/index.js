import React, { Component } from 'react'
import { connect } from 'dva'
import { NavPannel, ShowJsonTip } from '@components'
import { default as PurseDetail } from './Manage/PurseDetail'
import { default as Deposit } from './DigitalCurrency/Deposit'
import { default as WithDraw } from './DigitalCurrency/WithDraw'
import { default as Record } from './DigitalCurrency/Record'
import { assetManage } from '@assets'

const Comp = {
  PurseDetail,
  Deposit,
  WithDraw,
  Record
}
@connect(({ theme, modal, asset, history, loading, dispatch }) => ({
  model: asset,
  theme,
  modal,
  modelName: 'asset',
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
    const { dispatch, modelName } = this.props
    return (
      <div >
        <ShowJsonTip data={{ ...this.props.model }} />
        <NavPannel
          defaultActive='PurseDetail'
          navList={[
            {
              svg: assetManage,
              title: '资产管理',
              list: [
                {
                  name: 'PurseDetail',
                  title: '钱包明细',
                  onClick: () => {
                    return renderPage('PurseDetail')
                  }
                }
              ]
            },
            {
              svg: assetManage,
              title: '数字货币',
              list: [

                {
                  name: 'Deposit',
                  title: '存款',
                  onClick: () => {
                    return renderPage('Deposit')
                  }
                },
                {
                  name: 'WithDraw',
                  title: '提现',
                  onClick: () => {
                    dispatch({
                      type: `${modelName}/changeState`,
                      payload: {
                        withDrawPage: 1
                      }
                    })
                    return renderPage('WithDraw')
                  }
                },
                {
                  name: 'Record',
                  title: '资金记录',
                  onClick: () => {
                    return renderPage('Record')
                  }
                },
              ]
            }
          ]}
        />
      </div >
    )
  }
}
