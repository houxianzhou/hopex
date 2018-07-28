import React, { Component } from 'react'
import { connect } from 'dva'
import { ToastContainer, toast } from 'react-toastify'
import { ShowJsonTip, Select, Input } from '@components'
import { classNames, _ } from '@utils'
import Toast from '@components/Toast'
import { default as Structure } from './components/Structure'
import emailpng from '@assets/email.png'
import passwordpng from '@assets/password.png'
import countrypng from '@assets/country.png'
import pulldownpng from '@assets/pulldown.png'
import styles from './index.less'

@connect(({ user: model, loading, dispatch }) => ({
  model,
  modelName: 'user',
  dispatch
}))
export default class View extends Component {
  state = {
    countryCodeList: [],
    countryCodeListIsOpen: false,
    country: {
      code: '',
      name: ''
    },
    agentId: 1,
    password: '8888888',
    channel: 'appstore',
    userType: 'Normal',
    packType: 'pcweb',


    email: 'xiaoyi.wei@bcsystech.com',
    verificationCode: '081955',
    newPassword: '8888888'
  }

  changeState = (payload = {}) => {
    this.setState(payload)
  }


  render() {
    const { changeState } = this
    const {
      countryCodeListIsOpen,
      countryCodeList,
      country, password, agentId, channel, userType, packType, email, verificationCode, newPassword
    } = this.state
    const { dispatch, modelName } = this.props

    return (
      <Structure >

        <div className={styles.register} >
          <div className={styles.top} ></div >
          <div className={styles.center} >
            <form >
              <Input
                type='text'
                placeholder={'请填写邮箱'}
                value={email}
                onChange={(e) => {
                  changeState({
                    email: e.target.value
                  })
                }}
                onClear={() => {
                  changeState({
                    email: ''
                  })
                }}
                iconPrefix={(
                  <img alt='email' src={emailpng} />
                )}
              />
              <Input
                type='password'
                placeholder={'请填写密码'}
                value={password}
                onChange={(e) => {
                  changeState({
                    password: e.target.value
                  })
                }}

                onClear={() => {
                  changeState({
                    password: ''
                  })
                }}

                iconPrefix={(
                  <img alt='password' src={passwordpng} />
                )}
              />

              <Input
                type='other'
                placeholder={'请选择国家'}
                value={country.name}

                onClick={() => {
                  dispatch({
                    type: `${modelName}/getAllCountryCode`
                  }).then(res => {
                    if (res) {
                      changeState({
                        countryCodeList: res
                      })
                    }
                  })
                  changeState({
                    countryCodeListIsOpen: !countryCodeListIsOpen
                  })
                }}


                iconPrefix={(
                  <img style={{ height: 26 }} alt='country' src={countrypng} />
                )}

                iconPost={(
                  <div className={styles.select} >
                    <img alt='country' src={pulldownpng} />
                    <ul className={styles.countrys} >
                      {
                        countryCodeListIsOpen ? countryCodeList.map((item = {}, index) => (
                          <li
                            key={index}
                            onClick={() => {
                              changeState({
                                country: item
                              })
                            }}
                          >
                            {item.name}
                          </li >
                        )) : null
                      }
                    </ul >
                  </div >
                )}
              />
              <button
                className={classNames(
                  styles.loginbutton,
                  email && password ? styles.permit : styles.notpermit
                )}
                onClick={(e) => {
                  e.preventDefault()
                  dispatch({
                    type: `${modelName}/doRegister`,
                    payload: {
                      countryCode: country.code, password, agentId, channel, userType, packType, email
                    }
                  })
                }}
              >
                注册
              </button >
              {/*<button onClick={(e) => {*/}
              {/*e.preventDefault()*/}
              {/*dispatch({*/}
              {/*type: `${modelName}/doVertifyLogin`,*/}
              {/*payload: {*/}
              {/*userId: '3',*/}
              {/*googleCode: '174823',*/}
              {/*loginType: 'web'*/}
              {/*}*/}
              {/*})*/}
              {/*}} >*/}
              {/*二次验证登录*/}
              {/*</button >*/}
            </form >
          </div >
        </div >

        {/*<div >*/}
        {/*<div >*/}
        {/*<form >*/}
        {/*<input type='text' />*/}
        {/*<input type='text' />*/}
        {/*<input type='text' />*/}
        {/*<button onClick={(e) => {*/}
        {/*e.preventDefault()*/}
        {/*dispatch({*/}
        {/*type: `${modelName}/doRegister`,*/}
        {/*payload: {*/}
        {/*countryCode, password, agentId, channel, userType, packType, email*/}
        {/*}*/}
        {/*})*/}
        {/*}} >*/}
        {/*注册*/}
        {/*</button >*/}
        {/*</form >*/}
        {/*</div >*/}
        {/*<div >*/}
        {/*<form >*/}
        {/*<input type='text' />*/}
        {/*<button onClick={(e) => {*/}
        {/*e.preventDefault()*/}
        {/*dispatch({*/}
        {/*type: `${modelName}/doRegisterVerify`,*/}
        {/*payload: {*/}
        {/*email,*/}
        {/*verificationCode*/}
        {/*}*/}
        {/*})*/}
        {/*}} >*/}
        {/*注册激活*/}
        {/*</button >*/}
        {/*</form >*/}
        {/*</div >*/}
        {/*<div >*/}
        {/*<form >*/}
        {/*<input type='text' />*/}
        {/*<button onClick={(e) => {*/}
        {/*e.preventDefault()*/}
        {/*dispatch({*/}
        {/*type: `${modelName}/doEmailExists`,*/}
        {/*payload: {*/}
        {/*email*/}
        {/*}*/}
        {/*})*/}
        {/*}} >*/}
        {/*重置密码验证邮箱是否注册*/}
        {/*</button >*/}
        {/*</form >*/}
        {/*</div >*/}
        {/*<div >*/}
        {/*<form >*/}
        {/*<input type='text' />*/}
        {/*<button onClick={(e) => {*/}
        {/*e.preventDefault()*/}
        {/*dispatch({*/}
        {/*type: `${modelName}/doSendEmailCode`,*/}
        {/*payload: {*/}
        {/*email*/}
        {/*}*/}
        {/*})*/}
        {/*}} >*/}
        {/*重置密码发送邮箱验证码*/}
        {/*</button >*/}
        {/*</form >*/}
        {/*</div >*/}
        {/*<div >*/}
        {/*<form >*/}
        {/*<input type='text' />*/}
        {/*<button onClick={(e) => {*/}
        {/*e.preventDefault()*/}
        {/*dispatch({*/}
        {/*type: `${modelName}/doResetPassword`,*/}
        {/*payload: {*/}
        {/*verificationCode,*/}
        {/*email,*/}
        {/*newPassword*/}
        {/*}*/}
        {/*})*/}
        {/*}} >*/}
        {/*重置密码*/}
        {/*</button >*/}
        {/*</form >*/}
        {/*</div >*/}
        {/*<button onClick={() => {*/}
        {/*dispatch({*/}
        {/*type: `${modelName}/GetEnableGoogleVertifyCode`,*/}
        {/*payload: {}*/}
        {/*})*/}
        {/*}} >*/}
        {/*获取开启二次验证的设置信息*/}
        {/*</button >*/}
        {/*<button onClick={() => {*/}
        {/*dispatch({*/}
        {/*type: `${modelName}/doEnableGoogleVertify`,*/}
        {/*payload: {*/}
        {/*password,*/}
        {/*googleCode: '073415'*/}
        {/*}*/}
        {/*})*/}
        {/*}} >*/}
        {/*开启二次验证*/}
        {/*</button >*/}
        {/*<button onClick={() => {*/}
        {/*dispatch({*/}
        {/*type: `${modelName}/doDisbaleGoogleVertify`,*/}
        {/*payload: {*/}
        {/*password,*/}
        {/*googleCode: '650501',*/}
        {/*// loginType:'web'*/}
        {/*}*/}
        {/*})*/}
        {/*}} >*/}
        {/*关闭二次验证*/}
        {/*</button >*/}

        {/*<ShowJsonTip data={this.props.model} />*/}
        {/*</div >*/}
      </Structure >
    )
  }
}

