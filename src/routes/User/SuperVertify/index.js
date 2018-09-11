import React, { Component } from 'react'
import { connect } from 'dva'
import { Mixin, } from '@components'
import { default as SuperVertifyForm } from '@routes/Components/SuperVertifyForm'
import styles from '@routes/User/index.less'

@connect(({ account, Loading }) => ({
  model: account,
  loading: Loading,
}))
export default class View extends Component {

  render() {
    return (
      <Mixin.Child that={this} >
        <div className={styles.supervertify} >
          <SuperVertifyForm  {...this.props} styles={styles} />
        </div >
      </Mixin.Child >
    )
  }
}




