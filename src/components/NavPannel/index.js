import React, { Component } from 'react'
import { connect } from 'dva'
import * as styles from './index.less'

import { classNames, _, } from '@utils'

export default class View extends Component {
  componentDidMount() {
    const { navList = [], defaultActive = '' } = this.props
    const lists = navList.reduce((sum, next) => {
      return [].concat(next.list)
    }, [])
    const filterOne = lists.filter(item => item.name === defaultActive)[0]
    this.changePage(filterOne.onClick, defaultActive)
  }

  state = {
    active: '',
    page: null
  }

  changePage = (change, name) => {
    this.setState({
      active: name
    })
    if (_.isFunction(change)) {
      this.setState({
        page: change()
      })
    }
  }

  render() {
    const { page, active } = this.state
    const { navList = [] } = this.props
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
                            active === item.name ? 'active' : null
                          )}

                          onClick={() => {
                            this.changePage(item.onClick, item.name)
                          }} >
                          {item.title}
                        </li >
                      ))
                    }
                  </ul >
                </li >
              ))
            }
          </ul >
        </div >
        <div className={styles.content} >
          {page}
        </div >
      </div >
    )
  }
}
