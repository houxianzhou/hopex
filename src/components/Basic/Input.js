import React, { Component } from 'react'
import { classNames, _, } from '@utils'
import clearpng from '@assets/clear.png'
import * as styles from './Input.less'

export default class View extends Component {
  state = {
    err: ''
  }

  render() {
    const {
      iconPrefix, iconPost, placeholder, value,
      onChange, onClear, type = 'text', msg = '', onCheck, children,
      style = {}
    } = this.props

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
                    onChange={(e) => {
                      const v = e.target.value
                      onChange(v)
                      if (_.isFunction(onCheck)) onCheck(v)

                    }}
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
          msg ? (<div className='desc' >{msg}</div >) : null
        }
      </div >
    )
  }
}

