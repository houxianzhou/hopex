import React, { Component } from 'react'
import { connect } from 'dva'
import { classNames } from '@utils'
import back from '@assets/back.png'
import * as styles from './Structure.less'

@connect(({ user: model, loading, dispatch }) => ({
  model,
  modelName: 'user',
  dispatch
}))
export default class View extends Component {
  render() {
    const { children, dispatch, modelName } = this.props
    return (
      <div className={styles.structure} >
        <div className={styles.content} >
          <div className={styles.back} style={{ cursor: 'pointer' }} onClick={() => {
            dispatch({
              type: `${modelName}/routerGo`,
              payload: -1
            })
          }} >
            <img alt={'back'} src={back} />
            返回
          </div >
          {children}
        </div >
      </div >
    )
  }
}
