import React, { Component } from 'react'
import { connect } from 'dva'
import { NavLink } from 'dva/router'
import { classNames, switchTheme, _ } from '@utils'
import { PATH } from '@constants'
import logo from '@assets/logo.png'
import account from '@assets/account.png'
import help from '@assets/help.png'
import notice from '@assets/notice.png'
import network from '@assets/network.png'
import * as styles from './index.less'

let index = 0
@connect(({ home, user, theme, loading, dispatch }) => ({
  home,
  modelName1: 'home',
  modelName2: 'user',
  modelName3: 'theme',
  theme,
  user,
  loading,
  dispatch,
}))
export default class View extends Component {
  render() {
    const { home: { marketList = [] } = {}, user: { userInfo = {}, userInfo: { email } } = {}, theme: { RG } = {}, modelName1, modelName2, modelName3, dispatch, routesBasic, history } = this.props

    const isLogin = !_.isEmpty(userInfo)

    return (
      <div className={
        classNames(
          styles.header,
          styles.dark,
          // switchTheme(theme) ? styles.dark : styles.dark//styles.light
        )
      } >

        <div className={styles.left} >
          <img alt='logo' src={logo} />
          <ul className={styles.nav} >
            {
              routesBasic.map((item, index) => {
                let renderItem = null
                switch (item.name) {
                  case '合约交易': {
                    renderItem = (
                      <li key={index} className={styles.navli} >
                        合约交易
                        <div className={styles.dropdown} >
                          <ul >
                            {
                              marketList.map((item, index) => (
                                <li
                                  key={index}
                                  onClick={() => {
                                    dispatch({
                                      type: `${modelName1}/getCurrentMarket`,
                                      payload: item
                                    })
                                    // history.replace({
                                    //   search: `?marketCode=${item.marketCode}`,
                                    // });
                                  }}
                                >
                                  {item.marketName}
                                </li >
                              ))
                            }
                          </ul >
                        </div >
                      </li >
                    )
                  }
                    break
                  default: {
                    renderItem = (
                      <li key={item.name} className={styles.navli} >
                        {item.name}
                        {/*<NavLink to={item.path} >*/}
                        {/*{item.name}*/}
                        {/*</NavLink >*/}
                      </li >
                    )
                  }
                }
                return renderItem
              })
            }
          </ul >
        </div >

        <div
          className={styles.right}
        >
          <ul >
            <li >
              <img alt='network' src={network} />
            </li >
            <li >
              <img alt='notice' src={notice} />
            </li >
            <li >
              <img alt='help' src={help} />
            </li >
            {
              isLogin ? (
                <li className={styles.user} >
                  <img alt='account' src={account} />
                  {
                    email ? (<span >{email}</span >) : null
                  }
                  <div className={styles.accountContainer} >
                    <div className={styles.content} >
                      <ul className={styles.themelist} >
                        <li onClick={(e) => {
                          e.preventDefault()
                          dispatch({
                            type: `${modelName3}/changeState`,
                            payload: {
                              RG: 0
                            }
                          })
                        }} >
                          {
                            !RG ? <div ></div > : null
                          }
                          红涨绿跌
                        </li >
                        <li onClick={(e) => {
                          e.preventDefault()
                          dispatch({
                            type: `${modelName3}/changeState`,
                            payload: {
                              RG: 1
                            }
                          })
                        }} >
                          {
                            RG ? <div ></div > : null
                          }

                          绿涨红跌
                        </li >
                      </ul >
                      <div className={styles.desc} onClick={() => {
                        dispatch({
                          type: `${modelName2}/routerGo`,
                          payload: PATH.myaccount
                        })
                      }} >
                        我的账户
                      </div >
                      <div className={styles.loginout} onClick={() => {
                        dispatch({
                          type: `${modelName2}/doLoginOut`,
                        })
                      }} >
                        退出登录
                      </div >
                    </div >
                  </div >
                </li >
              ) : null
            }

            {/*<li >*/}
            {/*{_.isEmpty(userInfo) ? (*/}
            {/*<span*/}
            {/*onClick={() => {*/}
            {/*dispatch({*/}
            {/*type: `${modelName2}/routerGo`,*/}
            {/*payload: PATH.login*/}
            {/*})*/}
            {/*}}*/}
            {/*>登录</span >*/}
            {/*) : (*/}
            {/*<span*/}
            {/*onClick={() => {*/}
            {/*dispatch({*/}
            {/*type: `${modelName2}/doLoginOut`,*/}
            {/*})*/}
            {/*}}*/}
            {/*>退出</span >*/}
            {/*)}*/}
            {/*</li >*/}
          </ul >
        </div >
      </div >
    )
  }
}
