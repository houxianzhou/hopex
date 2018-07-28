import React, { Component } from 'react'
import { classNames, _ } from '@utils'
import clearpng from '@assets/clear.png'
import * as styles from './Input.less'


export default function (Props) {
  const { iconPrefix, iconPost, placeholder, value, onChange, onClear, onClick, type = 'text', msg = false } = Props
  return (
    <div className={styles.input} >
      <div className='content' >
        {
          iconPrefix ? (<div className='left' >
            {iconPrefix}
          </div >) : null
        }
        <div className='right' onClick={onClick} >
          {
            type === 'other' ? (
              <div className='inputdiv' >{value}</div >
            ) : (
              <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
              />
            )
          }

          {
            iconPost ? (
              iconPost
            ) : (
              value && onClear ? (
                <img src={clearpng} onClick={onClear} />
              ) : null
            )
          }
        </div >
      </div >
      {
        msg ? (<div className='desc' >消息提示</div >) : null
      }
    </div >
  )
}

