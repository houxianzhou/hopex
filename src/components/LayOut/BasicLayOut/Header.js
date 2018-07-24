import React, { Component } from 'react'
import { connect } from 'dva'
import { NavLink, routerRedux } from 'dva/router'
import { classNames, switchTheme, _ } from '@utils'
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
  theme,
  user,
  loading,
  dispatch,
}))
export default class View extends Component {
  render() {
    const { home: { marketList = [] } = {}, user: { userInfo }, theme, modelName1, modelName2, dispatch, routesBasic, history } = this.props

    return (
      <div className={
        classNames(
          styles.header,
          switchTheme(theme) ? styles.dark : styles.dark//styles.light
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
                                      type: `${modelName1}/changeState`,
                                      payload: item
                                    })
                                    history.replace({
                                      search: `?marketCode=${item.marketCode}`,
                                    });
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
            <li >
              <img alt='account' src={account} />
              <span >2278095567@qq.com</span >
            </li >
            <li >
              {_.isEmpty(userInfo) ? (
                <span
                  onClick={() => {
                    dispatch(routerRedux.push('/user/login'))
                  }}
                >登录</span >
              ) : (
                <span
                  onClick={() => {
                    dispatch({
                      type: `${modelName2}/doLoginOut`,
                    })
                  }}
                >退出</span >
              )}
            </li >
          </ul >

        </div >
      </div >
    )
  }
}
