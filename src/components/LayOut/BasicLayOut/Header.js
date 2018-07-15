import React, { Component } from 'react'
import { connect } from 'dva'
import { NavLink } from 'dva/router'
import { classNames, switchTheme } from '@utils'
import logo from '@assets/logo.png'
import * as styles from './index.less'

@connect(({ home, theme, loading, dispatch }) => ({
  home,
  modelName1: 'home',
  theme,
  loading,
  dispatch,
}))
export default class View extends Component {
  render() {
    const { home: { marketList = [] } = {}, theme, modelName1, dispatch, routesBasic } = this.props
    return (
      <div className={
        classNames(
          styles.header,
          switchTheme(theme) ? styles.dark : styles.light
        )
      } >
        <img alt='logo' src={logo} />
        <ul className={styles.nav} >
          {
            routesBasic.map(item => {
              let renderItem = null
              switch (item.name) {
                case '合约交易': {
                  renderItem = (
                    <li key={item.name} className={styles.navli} >
                      合约交易
                      <div className={styles.dropdown} >
                        <ul >
                          {
                            marketList.map(item => (
                              <li
                                key={item.name}
                                onClick={() => {
                                  dispatch({
                                    type: `${modelName1}/changeContractState`,
                                    payload: item.name
                                  })
                                }}
                              >
                                {item.name}
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
    )
  }
}
