import React, { Component } from 'react'
import { classNames, _ } from '@utils'
import clearpng from '@assets/clear.png'
import * as styles from './Input.less'

export default function (Props) {
  const {
    iconPrefix, iconPost, placeholder, value,
    onChange, onClear, type = 'text', msg = false, children,
    style = {}
  } = Props
  return (
    <div className={styles.input} >
      <div className='content' >
        {
          iconPrefix ? (<div className='left' >
            {iconPrefix}
          </div >) : null
        }
        <div className='right' >
          <div className='inputcontainer' >
            {
              children ? (
                children
              ) : (
                <input
                  type={type}
                  placeholder={placeholder}
                  value={value}
                  onChange={onChange}
                />
              )
            }
          </div >
          {
            iconPost || onClear ? (
              <div className='iconPostcontainer' style={!iconPost ? {
                minWidth: 60,
                ...style.iconPost
              } : {}} >
                {
                  iconPost ? (
                    iconPost
                  ) : (
                    value && onClear ? (
                      <img src={clearpng} onClick={onClear} style={{ cursor: 'pointer' }} />
                    ) : null
                  )
                }
              </div >
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

