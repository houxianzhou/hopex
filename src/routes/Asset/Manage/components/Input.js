import React, { Component } from 'react'
import { classNames, _ } from '@utils'
import * as styles from './Input.less'


export default class Input extends Component {
  render() {
    const { value = '', onChange, errorMsg = '', placeholder = '', children, onCheck } = this.props
    return (
      <div className={
        classNames(
          styles.container,
          errorMsg ? styles.error : null
        )

      } >
        <input
          placeholder={placeholder}
          value={value} onChange={(e) => {
          const value = e.target.value.replace('。', '.')
          _.isFunction(onChange) && onChange(value)
          _.isFunction(onCheck) && onCheck(value)
        }} />
        {children}

        {
          errorMsg ? (
            <div className={styles.errorMsg} >{errorMsg}</div >
          ) : null
        }
      </div >
    )
  }

}
