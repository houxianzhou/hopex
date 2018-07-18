import React, { Component } from 'react'
import { connect } from 'dva'
import { ShowJsonTip } from '@components'
import styles from './index.less'

@connect(({ user: model, loading, dispatch }) => ({
  model,
  modelName: 'user',
  dispatch
}))
export default class View extends Component {
  state = {
    email: 'xiaoyi.wei@bcsystech.com',
    password: '8888888'
  }

  changeState = (payload = {}) => {
    this.setState(payload)
  }
  login = () => {
    const { email, password } = this.state
    const { dispatch, modelName } = this.props
    dispatch({
      type: `${modelName}/doLogin`,
      payload: {
        email,
        password
      }
    })
  }

  render() {
    const { dispatch, modelName } = this.props
    const { email, password } = this.state
    return (
      <div >
        <form >
          <input type='text' value={email} onChange={(e) => {
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
          }} >
            登录
          </button >
          <button onClick={(e) => {
            e.preventDefault()
            dispatch({
              type: `${modelName}/doVertifyLogin`,
              payload: {
                userId: '3',
                googleCode: '174823',
                loginType:'web'
              }
            })
          }} >
            二次验证登录
          </button >
        </form >
        <ShowJsonTip data={this.props.model} />
      </div >
    )
  }
}

