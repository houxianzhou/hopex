import React, { Component } from 'react'
import { connect } from 'dva'
import * as styles from './index.less'

import { classNames, _, } from '@utils'

export default class View extends Component {
  state = {
    active: ''
  }

  render() {
    const { children, navList = [], defaultActive = '' } = this.props
    return (
      <div className={styles.navpannel} >
        <div className={styles.nav} >
          <ul className='block' >
            {
              navList.map((item = {}, index) => (
                <li key={index} >
                  <div className='title' >
                    <img src={item.icon} />
                    {item.title}
                  </div >
                  <ul className='list' >
                    {
                      item.list.map((item = {}, index) => (
                        <li
                          key={index}
                          className={classNames(
                            defaultActive === item.name ? 'active' : null
                          )}

                          onClick={() => {
                            if (_.isFunction(item.onClick)) {
                              item.onClick()
                            }
                          }} >{item.title}</li >
                      ))
                    }
                  </ul >
                </li >
              ))
            }
          </ul >
        </div >
        <div className={styles.content} >
          {children}
        </div >
      </div >
    )
  }
}
