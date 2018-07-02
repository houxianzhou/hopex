import React from 'react'
import { connect } from 'dva'
import { _ } from '@utils'

const getMixinProps = (that = {}) => {
  const { startInit } = that
  return {
    startInit
  }
}

@connect(({ user: model, loading, dispatch }) => ({
  model,
  modelName: 'user',
  loading, dispatch
}))
export default class View extends React.Component {
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
    })
  }

  startInit = () => {
    const { startInit } = getMixinProps(this.props.that)
    startInit && startInit()
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

