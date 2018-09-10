import React, { Component } from 'react'
import { connect } from 'dva'
import { ShowJsonTip,  NavPannel } from '@components'
import accountyellow from '@assets/accountyellow.png'
import MyAccount from './account/MyAccount'

const Comp = {
  MyAccount
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
        <ShowJsonTip data={this.props.model} />
        <NavPannel
          defaultActive='MyAccount'
          navList={[
            {
              title: '账户',
              icon: accountyellow,
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
                }
              ]
            }
          ]}
        />
      </div >
    )
  }
}

