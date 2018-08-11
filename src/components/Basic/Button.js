import React, { Component } from 'react'
import { classNames, _ } from '@utils'
import { Loading } from "@components"
import * as styles from './Button.less'

export default class View extends Component {
  // componentDidUpdate() {
  //
  // }

  render() {
    const { children, style = {}, className, onClick, loading = false } = this.props
    return (
      <div
        style={style}
        className={
          classNames(
            styles.button,
            loading ? styles.loadingStatus : null,
            className,
            loading ? 'loadingStatus' : null
          )
        }
        onClick={() => {
          if (_.isFunction(onClick) && !loading) {
            onClick()
          }
        }}
      >
        {children}
        <Loading.Circle loading={loading} />
      </div >
    )
  }

}
