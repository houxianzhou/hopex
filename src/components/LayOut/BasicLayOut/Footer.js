import React, { Component } from 'react'
import { connect } from 'dva'
import { PATH } from '@constants'
import { RouterGo } from '@components'
import { facebook, ins, twitter, telegram, logo3 } from '@assets'
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
    const { home: { marketList = [] } = {}, } = this.props

    return (
      <div className={styles.footer} >
        <div className={styles.top} >
          <div className={styles.left} >
            <div className={styles.logo} >
              {logo3}Hopex
            </div >
            <div className={styles.desc} >专注数字衍生品</div >
            <ul >
              <li >{facebook}</li >
              <li >{ins}</li >
              <li >{telegram}</li >
              <li >{twitter}</li >
            </ul >
          </div >
          <div className={styles.right} >
            <div className={styles.columns} >
              <div >关于</div >
              <ul >
                <RouterGo.SwitchRoute Ele={'li'} value={{
                  pathname: PATH.about,
                  search: `?page=AboutUs`
                }} >
                  关于我们
                </RouterGo.SwitchRoute >
                <RouterGo.SwitchRoute Ele={'li'} value={{
                  pathname: PATH.about,
                  search: `?page=Service`
                }} >
                  服务条款
                </RouterGo.SwitchRoute >
                <RouterGo.SwitchRoute Ele={'li'} value={{
                  pathname: PATH.about,
                  search: `?page=Privaty`
                }} >
                  隐私政策
                </RouterGo.SwitchRoute >
                <RouterGo.SwitchRoute Ele={'li'} value={{
                  pathname: PATH.about,
                  search: `?page=Safety`
                }} >
                  安全性
                </RouterGo.SwitchRoute >
              </ul >
            </div >
            <div className={styles.columns} >
              <div >热门交易</div >
              <ul >
                {
                  marketList.slice(0, 4).map((item, index) => (
                    <RouterGo.SwitchMarket key={index} value={item.marketCode} Ele='li' {...this.props}>
                      {item.marketName}
                    </RouterGo.SwitchMarket >
                  ))
                }
              </ul >
            </div >
            {/*<div className={styles.columns} >*/}
              {/*<div >帮助</div >*/}
              {/*<ul >*/}
                {/*<li >费用</li >*/}
                {/*<li >永续合约指南</li >*/}
                {/*<li >期货合约指南</li >*/}
                {/*<li >帮助中心</li >*/}
              {/*</ul >*/}
            {/*</div >*/}
          </div >
        </div >
        <div className={styles.down} >©Copyright.All Rights Reserved.</div >
      </div >
    )
  }
}
