import React, { Component } from 'react'
import { connect } from 'dva'
import logo3 from '@assets/logo3.png'
import facebook from '@assets/Facebook.png'
import ins from '@assets/ins.png'
import telegram from '@assets/telegram.png'
import twitter from '@assets/Twitter.png'
import { classNames, _ } from '@utils'

import * as styles from './index.less'


@connect(({ home, theme, loading, dispatch }) => ({
  home,
  modelName: 'home',
  theme,
  loading,
  dispatch,
}))
export default class View extends Component {
  render() {
    const { home: { marketList = [] } = {}, dispatch, routesBasic, history, switchMarket } = this.props

    return (
      <div className={styles.footer} >
        <div className={styles.top} >
          <div className={styles.left} >
            <div className={styles.logo} >
              <img src={logo3} />Hopex
            </div >
            <div className={styles.desc} >全球领先的数字资产衍生品交易平台</div >
            <ul >
              <li ><img src={facebook} /></li >
              <li ><img src={ins} /></li >
              <li ><img src={telegram} /></li >
              <li ><img src={twitter} /></li >
            </ul >
          </div >
          <div className={styles.right} >
            <div className={styles.columns} >
              <div >关于</div >
              <ul >
                <li >关于我们</li >
                <li >服务条款</li >
                <li >隐私政策</li >
                <li >安全性</li >
              </ul >
            </div >
            <div className={styles.columns} >
              <div >热门交易</div >
              <ul >
                {
                  marketList.slice(0, 4).map((item, index) => (
                    <li key={index} onClick={() => {
                      switchMarket(item.marketCode)
                    }} >{item.marketName}</li >
                  ))
                }
              </ul >
            </div >
            <div className={styles.columns} >
              <div >帮助</div >
              <ul >
                <li >费用</li >
                <li >永续合约指南</li >
                <li >期货合约指南</li >
                <li >帮助中心</li >
              </ul >
            </div >
          </div >
        </div >
        <div className={styles.down} >©Copyright.All Rights Reserved.</div >
      </div >
    )
  }
}
