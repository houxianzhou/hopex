import React, { Component } from 'react'
import { connect } from 'dva'
import { NavPannel } from '@components'
import { default as AboutUs } from './AboutUs.js'
import { default as Service } from './Service.js'
import { default as Privaty } from './Privaty.js'
import { default as Safety } from './Safety.js'

import { assetManage, $B3, $B4 } from '@assets'

const Comp = {
  AboutUs,
  Service,
  Privaty,
  Safety
}
@connect(({ theme, loading, dispatch }) => ({
  theme,
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
          {...this.props}
          defaultActive='AboutUs'
          navList={[
            {
              svg: assetManage,
              title: '关于',
              list: [
                {
                  name: 'AboutUs',
                  title: '关于我们',
                  onClick: () => {
                    return renderPage('AboutUs')
                  }
                },
                {
                  name: 'Service',
                  title: '服务条款',
                  onClick: () => {
                    return renderPage('Service')
                  }
                },
                {
                  name: 'Privaty',
                  title: '隐私政策',
                  onClick: () => {
                    return renderPage('Privaty')
                  }
                },
                {
                  name: 'Safety',
                  title: '安全性',
                  onClick: () => {
                    return renderPage('Safety')
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
