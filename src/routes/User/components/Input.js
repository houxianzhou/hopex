import React, { Component } from 'react'
import { classNames, _ } from '@utils'
import * as styles from './Input.less'


export default function (Props) {
  const { iconPrefix, iconPost, placeholder, value, onChange, type = 'text', msg = false } = Props
  return (
    <div className={styles.input} >
      <div className='content' >
        {
          iconPrefix ? (<div className='left' >
            {iconPrefix}
          </div >) : null
        }
        <div className='right' >
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
          {
            iconPost ? (
              <div className='iconpostfix' >后拽</div >
            ) : null
          }
        </div >
      </div >
      {
        msg ? (<div className='desc' >消息提示</div >) : null
      }


    </div >
  )
}

