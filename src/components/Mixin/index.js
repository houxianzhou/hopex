import React from 'react'
import { connect } from 'dva'
import { _ } from '@utils'


@connect(({ user: model, loading, dispatch }) => ({
  model,
  modelName: 'user',
  loading, dispatch
}))
export class MixinParent extends React.Component {

  constructor(props) {
    super(props)
    const { that } = this.props
    that.childInitStacks = []
  }

  componentDidMount() {
    const { model: { userInfo } = {}, dispatch, modelName } = this.props
    const getCurrentUser = new Promise((resolve, reject) => {
      resolve()
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
    that._isMounted = true
    that.shouldComponentUpdate = ((nextProps, nextState) => {
      if (_.isEqual(nextProps, that.props) && _.isEqual(nextState, that.state)) {
        return false
      }
      return true
    })
    that.changeState = (payload = {}, callback) => {
      if (that._isMounted) {
        that.setState(payload, () => {
          _.isFunction(callback) && callback()
        })
      }
    }
  }


  componentDidMount() {
    this.startInit()
  }

  componentWillUnmount() {
    this.props.that._isMounted = false
  }

  startInit = () => {
    const { that = {} } = this.props
    const [startInit, childInitStacks] = [
      _.get(that, 'startInit'),
      _.get(that, 'props.that.childInitStacks')
    ]
    if (_.isFunction(startInit) && _.isArray(childInitStacks)) {
      childInitStacks.push(() => {
        startInit()
      })
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




