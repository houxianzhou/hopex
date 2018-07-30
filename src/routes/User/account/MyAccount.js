import React, { Component } from 'react'
import { connect } from 'dva'
import { ShowJsonTip, Input, NavPannel } from '@components'
import { classNames, _, Patterns } from '@utils'
import { PATH } from '@constants'
import styles from './MyAccount.less'

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
          nav={(
            <div >左边</div >
          )}
        >
          hhh
        </NavPannel>
      </div >
    )
  }
}

