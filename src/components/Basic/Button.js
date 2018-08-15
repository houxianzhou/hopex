import React, { Component } from 'react'
import { classNames, _ } from '@utils'
import { Loading } from "@components"
import * as styles from './Button.less'

export default class View extends Component {
  // componentDidUpdate() {
  //
  // }

  render() {
    const { children, style = {}, className, onClick, loading = false, layer = true, loadingSize, color, loadingMargin } = this.props
    return (
      <div
        style={style}
        className={
          classNames(
            styles.button,
            loading && layer ? styles.loadingStatus : null,
            className,
            loading ? 'loadingStatus' : null
          )
        }
        onClick={(e) => {
          if (_.isFunction(onClick) && !loading) {
            onClick(e)
          }
        }}
      >
        {children}
        <Loading.Circle loading={loading} size={loadingSize} margin={loadingMargin} color={color} />
      </div >
    )
  }

}
