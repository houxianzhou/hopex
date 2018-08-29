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
    console.log('钱包明细')
  }


  render() {
    return (
      <Mixin.Child that={this} >
        <div >钱包明细</div >
      </Mixin.Child >
    )
  }
}


