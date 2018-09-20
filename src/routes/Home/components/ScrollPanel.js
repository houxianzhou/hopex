import React, { Component } from 'react'
import { connect } from 'dva'
import { THEME } from "@constants";
import { Loading } from '@components'
import { classNames } from '@utils'
import * as styles from './ScrollPanel.less'

@connect(({ theme }) => ({
  model: theme
}))
export default class View extends Component {

  render() {
    const {
      model: { theme }, header, children, className, style = {}, tableHeight = 'auto', loading = false
    }
      = this.props

    return (
      <div className={
        classNames(
          styles.scrollPannel,
          className
        )
      } style={style} >
        {
          header ? (<div className={styles.header} >{header}</div >) : null
        }
        <div className={styles.scrollPannelContainer} style={{ height: tableHeight }} >
          <div className={styles.scrollPannelContent} >
            {
              loading ? (
                <Loading.Circle loading={loading} isGlobal backgroundOpacity={
                  theme === THEME.DEEPDARK ? undefined : 0.08
                } />
              ) : null
            }
            {children}
          </div >
        </div >
      </div >
    )
  }
}
