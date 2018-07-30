import React, { Component } from 'react'
import { connect } from 'dva'
import { ShowJsonTip, Input, NavPannel } from '@components'
import { classNames, _, Patterns } from '@utils'
import { PATH } from '@constants'
import accountyellow from '@assets/accountyellow.png'
import styles from './index.less'

@connect(({ user: model, loading, dispatch }) => ({
  model,
  modelName: 'user',
  dispatch
}))
export default class View extends Component {
  render() {
    return (
      <div className={styles.myaccountpage} >
        <NavPannel
          navList={[
            {
              title: '账户',
              icon: accountyellow,
              list: [{
                name: '我的账户'
              }]
            }
          ]}
        >
          hhh
        </NavPannel >
      </div >
    )
  }
}

