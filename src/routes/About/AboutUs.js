import React, { Component } from 'react'
import { connect } from 'dva'
import { Mixin } from '@components'

import * as styles from '@routes/About/index.less'

@connect(({  Loading, dispatch, }) => ({
  dispatch,
  loading: Loading
}))
export default class View extends Component {
  state = {}

  componentDidMount() {
    this.startInit()
  }

  startInit = () => {

  }


  render() {
    const {  } = this.props

    return (
      <Mixin.Child that={this} >
        <div className={styles.aboutus} >
          关于我们
        </div >
      </Mixin.Child >
    )
  }
}


