import React, { Component } from 'react'
import { connect } from 'dva'
import { ShowJsonTip, Input, NavPannel } from '@components'
import { classNames, _, Patterns } from '@utils'
import { PATH } from '@constants'
import accountyellow from '@assets/accountyellow.png'
import MyAccount from './MyAccount'
import styles from './index.less'

const Comp = {
  MyAccount
}
@connect(({ user: model, loading, dispatch }) => ({
  model,
  modelName: 'user',
  dispatch
}))
export default class View extends Component {
  renderPage = (page) => {
    const RenderItem = Comp[page]
    return <RenderItem ></RenderItem >
  }

  render() {
    const { renderPage } = this
    return (
      <div className={styles.myaccountpage} >
        <NavPannel
          defaultActive='MyAccount'
          navList={[
            {
              title: '账户',
              icon: accountyellow,
              list: [{
                name: 'MyAccount',
                title: '我的账户',
              }]
            }
          ]}
        >
          {
            renderPage('MyAccount')
          }
        </NavPannel >
      </div >
    )
  }
}

