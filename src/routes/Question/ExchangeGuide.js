import React, { Component } from 'react'
import { connect } from 'dva'
import { Mixin } from '@components'

import * as styles from '@routes/Question/index.less'

@connect(({ Loading, dispatch, question }) => ({
  dispatch,
  model: question,
  modelName: 'question',
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
    const { model: { myName }, calculateTableHeight, dispatch, modelName, loading } = this.props

    return (
      <Mixin.Child that={this} >
        <div className={styles.contractExchange} >
          解释说明{myName}
        </div >
      </Mixin.Child >
    )
  }
}


