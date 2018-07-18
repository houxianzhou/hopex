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
    countryCode: 'EN',
    password: '8888888',
    agentId: 2,
    channel: 'appstore',
    userType: 'Normal',
    packType: 'pcweb',
    email: 'xiaoyi.wei@bcsystech.com',
    verificationCode: '081955',
    newPassword: '8888888'
  }


  render() {
    const {
      countryCode, password, agentId, channel, userType, packType, email, verificationCode, newPassword
    } = this.state
    const { dispatch, modelName } = this.props
    return (
      <div >
        <div >
          <form >
            <input type='text' />
            <input type='text' />
            <input type='text' />
            <button onClick={(e) => {
              e.preventDefault()
              dispatch({
                type: `${modelName}/doRegister`,
                payload: {
                  countryCode, password, agentId, channel, userType, packType, email
                }
              })
            }} >
              注册
            </button >
          </form >
        </div >
        <div >
          <form >
            <input type='text' />
            <button onClick={(e) => {
              e.preventDefault()
              dispatch({
                type: `${modelName}/doRegisterVerify`,
                payload: {
                  email,
                  verificationCode
                }
              })
            }} >
              注册激活
            </button >
          </form >
        </div >
        <div >
          <form >
            <input type='text' />
            <button onClick={(e) => {
              e.preventDefault()
              dispatch({
                type: `${modelName}/doEmailExists`,
                payload: {
                  email
                }
              })
            }} >
              重置密码验证邮箱是否注册
            </button >
          </form >
        </div >
        <div >
          <form >
            <input type='text' />
            <button onClick={(e) => {
              e.preventDefault()
              dispatch({
                type: `${modelName}/doSendEmailCode`,
                payload: {
                  email
                }
              })
            }} >
              重置密码发送邮箱验证码
            </button >
          </form >
        </div >
        <div >
          <form >
            <input type='text' />
            <button onClick={(e) => {
              e.preventDefault()
              dispatch({
                type: `${modelName}/doResetPassword`,
                payload: {
                  verificationCode,
                  email,
                  newPassword
                }
              })
            }} >
              重置密码
            </button >
          </form >
        </div >
        <button onClick={() => {
          dispatch({
            type: `${modelName}/GetEnableGoogleVertifyCode`,
            payload: {}
          })
        }} >
          获取开启二次验证的设置信息
        </button >
        <button onClick={() => {
          dispatch({
            type: `${modelName}/doEnableGoogleVertify`,
            payload: {
              password,
              googleCode: '073415'
            }
          })
        }} >
          开启二次验证
        </button >
        <button onClick={() => {
          dispatch({
            type: `${modelName}/doDisbaleGoogleVertify`,
            payload: {
              password,
              googleCode: '650501',
              // loginType:'web'
            }
          })
        }} >
          关闭二次验证
        </button >

        <ShowJsonTip data={this.props.model} />
      </div >
    )
  }
}

