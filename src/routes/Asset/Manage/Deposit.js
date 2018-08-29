import React, { Component } from 'react'
import { connect } from 'dva'
import { Mixin } from '@components'
import { classNames, _, } from '@utils'

import styles from './index.less'

@connect(({ modal, Loading }) => ({
  modal,
  loading: Loading
}))
export default class View extends Component {
  componentDidMount() {
    this.startInit()
  }

  startInit = () => {
    console.log('存款')
  }


  render() {
    return (
      <Mixin.Child that={this} >
        <div className={styles.deposit}>存款</div >
      </Mixin.Child >
    )
  }
}


