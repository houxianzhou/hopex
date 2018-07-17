import React, { Component } from 'react'
import { connect } from 'dva'
import styles from './index.less'

@connect(({ user: model, loading, dispatch }) => ({
  model,
  modelName: 'user',
  dispatch
}))
export default class View extends Component {
  state = {
    name: 'weixiaoyi',
    password: '123456'
  }

  changeState = (payload = {}) => {
    this.setState(payload)
  }
  login = () => {
    const { name, password } = this.state
    const { dispatch, modelName } = this.props
    dispatch({
      type: `${modelName}/doLogin`,
      payload: {
        name,
        password
      }
    })
  }

  render() {
    const { name, password } = this.state
    return (
      <div >
        <form >
          <input type='text' value={name} onChange={(e) => {
            this.changeState({
              name: e.target.value
            })
          }} />
          <input type='password' value={password} onChange={(e) => {
            this.changeState({
              password: e.target.value
            })
          }} />
          <button onClick={(e) => {
            e.preventDefault()
            this.login()
          }} >登录
          </button >
        </form >
      </div >
    )
  }
}

