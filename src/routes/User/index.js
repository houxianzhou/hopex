import React, { Component } from 'react'
import { connect } from 'dva'
import { ShowJsonTip, NavPannel } from '@components'
import { mine } from '@assets'
import MyAccount from './account/MyAccount'
import SuperVertify from './SuperVertify/index'

const Comp = {
  MyAccount,
  SuperVertify
}
@connect(({ user, account: model, loading, dispatch }) => ({
  model,
  user,
  modelName: 'account',
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
    const { dispatch, modelName } = this.props
    const { renderPage } = this
    return (
      <div >
        {/*<ShowJsonTip data={this.props.model} />*/}
        <NavPannel
          {...this.props}
          defaultActive='MyAccount'
          navList={[
            {
              title: '账户',
              svg: mine,
              list: [
                {
                  name: 'MyAccount',
                  title: '我的账户',
                  onClick: () => {
                    dispatch({
                      type: `${modelName}/changeState`,
                      payload: {
                        myAccountPage: 1
                      }
                    })
                    return renderPage('MyAccount')
                  }
                },
                {
                  name: 'SuperVertify',
                  title: '高级认证',
                  onClick: () => {
                    dispatch({
                      type: `${modelName}/changeState`,
                      payload: {
                        superVertifyPage: 1
                      }
                    })
                    return renderPage('SuperVertify')
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

