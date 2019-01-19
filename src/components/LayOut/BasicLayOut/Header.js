import React, { Component } from 'react'
import { connect } from 'dva'
import { NavLink } from 'dva/router'
import { classNames, switchTheme, _, dealInterval, localSave } from '@utils'
import { RouterGo, Mixin, Select } from '@components'
import { PATH, THEME, } from '@constants'
import { netWorkBest, netWorkGood, netWorkBad, notice, help, account, logo } from '@assets'
import RedGreenSwitch from '@routes/Components/RedGreenSwitch'
import * as styles from './index.less'

@connect(({ home, user, theme, loading, dispatch }) => ({
  home,
  modelName: 'home',
  modelName2: 'user',
  modelName3: 'theme',
  theme,
  user,
  loading,
  dispatch,
}))
export default class View extends Component {
  componentDidMount() {
    this.getNetWork()
  }

  getNetWork = () => {
    const { dispatch, modelName3 } = this.props
    dispatch({
      type: `${modelName3}/getNetWork`
    }).then(() => {
      if (!this._isMounted || this.interval) return
      this.interval = dealInterval(() => {
        this.interval = null
        this.getNetWork()
      })
    })
  }

  renderNetWork = (netWorkStatus) => {
    let message
    let svg
    if (netWorkStatus === 2) {
      svg = netWorkBest
      message = '网络正常'
    } else if (netWorkStatus === 1) {
      svg = netWorkGood
      message = '网络缓慢'
    } else {
      svg = netWorkBad
      message = '网络异常'
    }
    return (
      <>
        {svg}
        <span >{message}</span >
      </>
    )
  }

  changeTheme = (theme) => {
    const { dispatch, modelName3 } = this.props
    dispatch({
      type: `${modelName3}/changeState`,
      payload: {
        theme: theme
      }
    })
    localSave.set('theme', theme)
  }

  render() {
    const { changeTheme } = this
    const { home: { marketList = [] } = {}, user: { userInfo = {}, userInfo: { email } } = {}, theme: { RG, theme, netWorkStatus } = {}, modelName2, modelName3, dispatch, routesBasic, location: { pathname } = {} } = this.props

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
      <Mixin.Child that={this} >
        <div className={
          classNames(
            styles.header,
          )
        } >
          <div className={styles.left} >
            <RouterGo.SwitchRoute value={PATH.dashboard} >
              {logo}
            </RouterGo.SwitchRoute >
            <ul className={styles.nav} >
              {
                routesBasic.map((item = {}, index) => {
                  return (

                    item.show === false ? null : (
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
                                              <RouterGo.SwitchMarket key={index2} value={item2.marketCode}
                                                                     Ele='li' {...this.props}>
                                                <div className={styles.name} >
                                                  {item2.pause ? <div >暂停</div > : null}
                                                  {item2.marketName}
                                                </div >
                                                <div className={styles.price} >
                                                  <RedGreenSwitch.MarkText mark={item2.priceLast}
                                                                           value={item2.priceLast.replace(/['+','-']/, '')} />
                                                </div >
                                                <div className={styles.percent} >
                                                  <RedGreenSwitch.MarkText
                                                    mark={item2.percent}
                                                    value={item2.percent.replace(/['+','-']/, '')} />
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
                <div >
                  {this.renderNetWork(netWorkStatus)}
                </div >
              </li >
              {/*<li >*/}
                {/*<div >*/}
                  {/*{notice}*/}
                  {/*<span >通知</span >*/}
                {/*</div >*/}
              {/*</li >*/}
              {/*<li onClick={() => {*/}
                {/*window.open('https://hopex.zendesk.com/')*/}
              {/*}} >*/}
                {/*<div >*/}
                  {/*{help}*/}
                  {/*<span >帮助中心</span >*/}
                {/*</div >*/}
              {/*</li >*/}
              {
                isLogin ? (
                  <li >
                    <div className={styles.user} >
                      {account}
                      {
                        email ? (<span >{email}</span >) : null
                      }
                      <div className={styles.accountContainer} >
                        <div className={styles.content} >
                          <div className={styles.title} >交易界面设定</div >
                          <ul className={styles.themelist} >
                            <li onClick={(e) => {
                              e.preventDefault()
                              changeTheme(THEME.DEEPDARK)
                            }} >
                              <div className={classNames(
                                theme === THEME.DEEPDARK ? styles.active : null
                              )} />
                              深色
                            </li >
                            <li onClick={(e) => {
                              e.preventDefault()
                              changeTheme(THEME.LIGHT)
                            }} >
                              <div className={classNames(
                                theme !== THEME.DEEPDARK ? styles.active : null
                              )} />
                              浅色
                            </li >
                          </ul >
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
                              <div className={classNames(
                                !RG ? styles.active : null
                              )} />
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
                              <div className={classNames(
                                RG ? styles.active : null
                              )} />
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
                    </div >
                  </li >
                ) : null
              }
              {
                !isLogin ? (
                  <>
                    <li >
                      <div >
                        <RouterGo.SwitchRoute value={PATH.login} >
                   <span >
                  登录
                </span >
                        </RouterGo.SwitchRoute >

                      </div >
                    </li >
                    <li className={styles.freeregister} >
                      <div >
                        <RouterGo.SwitchRoute value={PATH.register} >
                          <span >免费注册</span >
                        </RouterGo.SwitchRoute >
                      </div >
                    </li >
                  </>
                ) : null
              }
            </ul >
            {/*<div >*/}
            {/*<Select />*/}
            {/*</div >*/}
          </div >
        </div >
      </Mixin.Child >
    )
  }
}
