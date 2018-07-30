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
      <div className={styles.myaccount} >
        <div className={styles.header} >
          <div className={styles.left} >
            <div className={styles.email} >2278095567@qq.com</div >
            <div className={styles.country} >中国</div >
          </div >
          <div className={styles.right} >
            <div >最后登录时间 :<span >2018-04-25</span ></div >
            <div >Ip :<span >121.29.15.199</span ></div >
          </div >

        </div >
      </div >
    )
  }
}

