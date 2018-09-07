import React, { Component } from 'react'
import { connect } from 'dva'
import { classNames, _ } from '@utils'
import { back } from '@assets'
import * as styles from './Structure.less'

@connect(({ user: model, loading, dispatch }) => ({
  model,
  modelName: 'user',
  dispatch
}))
export default class View extends Component {
  render() {
    const { children, dispatch, modelName, goBack } = this.props
    return (
      <div className={styles.structure} >
        <div className={styles.content} >
          <div className={styles.back} style={{ cursor: 'pointer' }} onClick={() => {
            if (_.isFunction(goBack)) {
              goBack()
            } else {
              dispatch({
                type: `${modelName}/routerGo`,
                payload: -1
              })
            }
          }} >
            {back}
            返回
          </div >
          {children}
        </div >
      </div >
    )
  }
}
