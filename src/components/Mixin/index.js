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
      resolve()
      // if (_.isEmpty(userInfo)) {
      //   return dispatch({
      //     type: `${modelName}/getCurrentUser`,
      //     payload: {
      //       resolve, reject
      //     }
      //   })
      // } else {
      //   return resolve(userInfo)
      // }
    })
    getCurrentUser.then(res => {
      this.startInit()
    }).catch((error) => {
      console.log('用户信息获取失败或者父startInit调用出错通常是由于子startInit调用出错', error)
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
  constructor(props) {
    super(props)
    const { that = {} } = this.props
    if (!that.props.that.childInitStacks) that.props.that.childInitStacks = []
  }

  componentDidMount() {
    this.startInit()
  }

  componentWillUnmount() {
    this.startUnMount()
  }

  startInit = () => {
    const { that = {} } = this.props
    const [startInit, childInitStacks] = [_.get(that, 'startInit'), _.get(that, 'props.that.childInitStacks')]
    if (_.isFunction(startInit) && _.isArray(childInitStacks)) {
      childInitStacks.push(this.startUnMount)
      childInitStacks.push(startInit)
    }
    console.log(childInitStacks.length)
  }

  startUnMount = () => {
    const { that = {} } = this.props
    if (that.interval) {
      if (_.isArray(that.interval)) {
        that.interval.map(item => clearTimeout(item))
      } else {
        clearTimeout(that.interval)
      }
      that.interval = null
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




