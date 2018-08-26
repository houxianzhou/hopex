import React, { Component } from 'react'
import { connect } from 'dva'
import { NavLink } from 'dva/router'
import { classNames, switchTheme, _ } from '@utils'
import { RouterGo } from '@components'
import { PATH } from '@constants'
import logo from '@assets/logo.png'
import account from '@assets/account.png'
import help from '@assets/help.png'
import notice from '@assets/notice.png'
import network from '@assets/network.png'
import RedGreenSwitch from '@routes/Components/RedGreenSwitch'
import * as styles from './index.less'

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
    const { home: { marketList = [] } = {}, user: { userInfo = {}, userInfo: { email } } = {}, theme: { RG } = {}, modelName2, modelName3, dispatch, routesBasic, location: { pathname } = {} } = this.props

    const isLogin = !_.isEmpty(userInfo)
    const sorted = _.groupBy(marketList, (item = {}) => item.sortType) || {}

    const isMatch = (path) => {
      return pathname === path
    }

    const cla = (item = {}) => {
      return classNames(
        styles.navli,
        isMatch(item.path) ? styles.active : null
      )
    }

    return (
      <div className={
        classNames(
          styles.header,
        )
      } >
        <div className={styles.left} >
          <img alt='logo' src={logo} />
          <ul className={styles.nav} >
            {
              routesBasic.map((item = {}, index) => {
                return (
                  <li key={index} className={cla(item)} >
                    <NavLink to={item.path} >
                      {item.name}
                    </NavLink >
                    {isMatch(item.path) ? (<div className={styles.border} />) : null}
                    {
                      item.dest === 'trade' && !_.isEmpty(sorted) ? (
                        <div className={styles.dropdown} >
                          <div className={styles.dropdowncontent} >
                            {
                              _.keys(sorted).map((item1, index) => (
                                <div
                                  className={styles.licontainer}
                                  key={index}
                                >
                                  <div className={styles.liheader} >
                                    {item1}
                                  </div >
                                  <ul >
                                    {
                                      sorted[item1].map((item2 = {}, index2) => {
                                        return (
                                          <RouterGo.SwitchMarket key={index2} value={item2.marketCode} Ele='li' {...this.props}>
                                            <div className={styles.name} >
                                              {item2.pause ? <div >暂停</div > : null}
                                              {item2.marketName}
                                            </div >
                                            <div className={styles.price} >
                                              {
                                                /[\+]/.test(item2.priceLast) ? (
                                                  <RedGreenSwitch.GreenText
                                                    value={item2.priceLast} />
                                                ) : (
                                                  <RedGreenSwitch.RedText
                                                    value={item2.priceLast} />
                                                )
                                              }
                                            </div >
                                            <div className={styles.percent} >
                                              {
                                                /[\+]/.test(item2.percent) ? (
                                                  <RedGreenSwitch.GreenText
                                                    value={item2.percent} />
                                                ) : (
                                                  <RedGreenSwitch.RedText
                                                    value={item2.percent} />
                                                )
                                              }
                                            </div >
                                          </RouterGo.SwitchMarket >
                                        )
                                      })
                                    }
                                  </ul >
                                </div >
                              ))
                            }
                          </div >
                        </div >
                      ) : null
                    }
                  </li >
                )
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
            <li onClick={() => {
              window.open('https://hopex.zendesk.com/')
            }} >
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
                            !RG ? <div /> : null
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
                            RG ? <div /> : null
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
          </ul >
        </div >
      </div >
    )
  }
}
