import React, { Component } from 'react'
import { connect } from 'dva'
import * as styles from './index.less'

import { classNames, _, parsePathSearch } from '@utils'

export default class View extends Component {
  componentDidMount() {
    const search = _.get(this.props, 'location.search')
    const { page } = parsePathSearch(search)

    const { navList = [], defaultActive = '' } = this.props
    const lists = navList.reduce((sum, next) => {
      return sum.concat(next.list)
    }, [])
    const filterOne = lists.filter(item => item.name === (page || defaultActive))[0] || lists[0]
    this.changePage(filterOne.onClick, filterOne.name)
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
    const { page, active, } = this.state
    let { navList = [], } = this.props
    const { style: { widthPannel = '79%', widthNav = '19%' } = {}, history } = this.props
    navList = navList.filter(item => item.show !== false)
    return (
      <div className={styles.pannelContainer} >
        <div className={styles.navpannel} style={{ width: widthPannel }} >
          <div className={styles.nav} style={{ width: widthNav }} >
            <ul className='block' >
              {
                navList.map((item = {}, index) => (
                  <li key={index} >
                    <div className='title' >
                      {
                        item.svg ? item.svg : <img src={item.icon} />
                      }
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
                              if (history && history.replace) {
                                history.replace(`?page=${item.name}`)
                              }
                              this.changePage(item.onClick, item.name)
                            }} >
                            <div className={classNames(
                              'border',
                            )} />
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
      </div >
    )
  }
}
