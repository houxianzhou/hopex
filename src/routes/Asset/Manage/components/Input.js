import React, { Component } from 'react'
import { classNames, _ } from '@utils'
import * as styles from './Input.less'


export default class Input extends Component {
  render() {
    const { value = '', onChange, errorMsg = '' } = this.props
    return (
      <div className={styles.container} >
        <input
          className={classNames(
            errorMsg ? styles.error : null
          )}
          value={value} onChange={(e) => {
          _.isFunction(onChange) && onChange(e.target.value)
        }} />

        {
          errorMsg ? (
            <div className={styles.errorMsg} >errorMsg</div >
          ) : null
        }
      </div >
    )
  }

}
