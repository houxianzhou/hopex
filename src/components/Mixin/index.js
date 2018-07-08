import React from 'react'
import { connect } from 'dva'
import { _ } from '@utils'


@connect(({ user: model, loading, dispatch }) => ({
  model,
  modelName: 'user',
  loading, dispatch
}))
export class MixinParent extends React.Component {
  componentDidMount() {
    const { model: { userInfo } = {}, dispatch, modelName } = this.props
    const getCurrentUser = new Promise((resolve, reject) => {
      if (_.isEmpty(userInfo)) {
        return dispatch({
          type: `${modelName}/getCurrentUser`,
          payload: {
            resolve, reject
          }
        })
      } else {
        return resolve(userInfo)
      }
    })
    getCurrentUser.then(res => {
      this.startInit()
    }).catch((error) => {
      console.log('用户信息获取失败或者startInit调用出错', error)
    })
  }

  startInit = () => {
    const { that = {} } = this.props
    const { startInit } = that
    if (_.isFunction(startInit)) {
      startInit && startInit()
    }
  }

  render() {
    const { children } = this.props
    return (
      <>
        {children}
      </>
    )
  }
}

export class MixinChild extends React.Component {
  componentDidMount() {
    this.startInit()
  }

  startInit = () => {
    const { that = {} } = this.props
    const [startInit, initStacks] = [_.get(that, 'startInit'), _.get(that, 'props.initStacks')]
    if (_.isFunction(startInit) && _.isArray(initStacks)) {
      initStacks.push(startInit)
    }
  }

  render() {
    const { children } = this.props
    return (
      <>
        {children}
      </>
    )
  }
}

export default {
  Parent: MixinParent,
  Child: MixinChild
}




