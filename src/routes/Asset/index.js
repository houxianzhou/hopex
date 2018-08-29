import React, { Component } from 'react'
import { connect } from 'dva'
import { NavPannel } from '@components'
import { default as PurseDetail } from './Manage/PurseDetail'
import { default as Deposit } from './Manage/Deposit'
import { assetManage } from '@assets'

const Comp = {
  PurseDetail,
  Deposit
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
                },
                {
                  name: 'Deposit',
                  title: '存款',
                  onClick: () => {
                    return renderPage('Deposit')
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
