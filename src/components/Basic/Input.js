import React, { Component } from 'react'
import { classNames, _, } from '@utils'
import { clearpng } from '@assets'
import * as styles from './Input.less'

export default class View extends Component {
  state = {
    err: ''
  }

  render() {
    const {
      iconPrefix, iconPost, placeholder, value,
      onChange, onClear, type = 'text', msg = '', onCheck, children,
      style = {}, autoComplete
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
                  <>
                    {type === 'password' ? (<input type="password" name={type} style={{ display: 'none' }} />) : null}
                    <input
                      name={type}
                      autoComplete={autoComplete}
                      type={type}
                      placeholder={placeholder}
                      value={value}
                      onChange={(e) => {
                        const v = e.target.value
                        onChange(v)
                        if (_.isFunction(onCheck)) onCheck(v)

                      }}
                    />
                  </>
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
                        <span onClick={onClear} style={{ cursor: 'pointer' }} >
                          {clearpng}
                        </span >
                      ) : null
                    )
                  }
                </div >
              ) : null
            }
          </div >
        </div >
        {
          msg ? (<div className='inputmsgdesc' >{msg}</div >) : null
        }
      </div >
    )
  }
}

