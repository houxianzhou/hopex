import React, { Component } from 'react'
import { connect } from 'dva'
import { ShowJsonTip, Input, Toast, Button } from '@components'
import { classNames, _, Patterns, localSave } from '@utils'
import { PATH } from '@constants'
import { email as emailpng, passwordpng, vertifycodepng, logo2 } from '@assets'
import { default as Structure } from './components/Structure'
import styles from './index.less'

@connect(({ user: model, Loading: loading, dispatch }) => ({
  model,
  loading,
  modelName: 'user',
  dispatch
}))
export default class View extends Component {
  componentDidMount() {
    const newPasswordSave = localSave.get('newPassword') || localSave.get('recordEmail') || {}
    const { email, msg } = newPasswordSave
    if (email && msg) {
      this.changeState({ email, password: '' })//密码不填
      Toast.tip(msg)
      localSave.remove('newPassword')
    } else {
      if (email) {
        this.changeState({ email })
      }
    }
  }

  state = {
    page: 1,
    email: '',
    emailMsg: '',
    password: '',
    passwordMsg: '',

    googleCode: '',
    userId: ''
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
        password,
        redirect: this.getLocationState()
      }
    }).then(res => {
      if (res) {
        this.changeState({
          ...res,
          page: 2
        })
        // 说明需要谷歌验证码
      }
    })
  }

  doVertifyLogin = () => {
    const { email, userId, googleCode } = this.state
    const { dispatch, modelName } = this.props
    dispatch({
      type: `${modelName}/doVertifyLogin`,
      payload: {
        email,
        userId,
        googleCode,
        loginType: 'pcweb',
        redirect: this.getLocationState()
      }
    })
  }

  getLocationState = () => {
    const { location: { state: { redirect } = {} } = {} } = this.props
    return redirect
  }

  render() {
    const person1 = {
      email: 'xiaoyi.wei@bcsystech.com',
      password: '8888888'
    }
    const person2 = {
      email: '2278095567@qq.com',
      password: '8888888'
    }
    const { changeState } = this
    const { email, emailMsg, password, passwordMsg, googleCode, userId, page } = this.state
    const { dispatch, modelName, loading } = this.props
    return (
      <Structure goBack={page !== 1 ? () => {
        changeState({ page: page - 1 })
      } : null} >
        <div className={styles.login} >
          <div className={styles.top} >
            <div className={styles.logo} >
              {logo2}
            </div >
            <div className={styles.name} >Hopex</div >
            <div className={styles.desc} >专注数字衍生品</div >
          </div >
          {
            page === 1 ? (
              <div className={styles.down} >
                <form >
                  <Input
                    type='text'
                    placeholder={'请填写邮箱'}
                    value={email}
                    msg={emailMsg}
                    onChange={(value) => {
                      changeState({
                        email: value
                      })
                    }}

                    onCheck={(value) => {
                      if (value && !Patterns.email.test(value)) {
                        changeState({
                          emailMsg: '邮箱格式错误'
                        })
                      } else {
                        changeState({
                          emailMsg: ''
                        })
                      }
                    }}

                    onClear={() => {
                      changeState({
                        email: '',
                        emailMsg: ''
                      })
                    }}

                    iconPrefix={emailpng}
                  />
                  <Input
                    type='password'
                    autoComplete="off"
                    placeholder={'请填写密码'}
                    value={password}
                    msg={passwordMsg}
                    onChange={(value) => {
                      changeState({
                        password: value
                      })
                    }}

                    onClear={() => {
                      changeState({
                        password: '',
                        passwordMsg: ''
                      })
                    }}

                    iconPrefix={(
                      passwordpng
                    )}
                  />

                  <Button
                    loading={loading.effects[`${modelName}/doLogin`]}
                    className={classNames(
                      styles.formbutton,
                      email && !emailMsg && password && !passwordMsg ? styles.permit : styles.notpermit
                    )}
                    onClick={(e) => {
                      e.preventDefault()
                      this.login()
                    }} >
                    <button >
                      登录
                    </button >
                  </Button >
                </form >
                <div className={styles.othermethod} >
                  <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      dispatch({
                        type: `${modelName}/routerGo`,
                        payload: PATH.forgetPassword
                      })
                    }}
                  >忘记密码 ?
                  </div >
                  <div
                    style={{ cursor: 'pointer' }}
                    className={styles.registerentery}
                    onClick={() => {
                      dispatch({
                        type: `${modelName}/routerGo`,
                        payload: PATH.register
                      })
                    }}
                  >
                    注册
                  </div >
                </div >
              </div >
            ) : null
          }
          {
            page === 2 ? (
              <div className={styles.down} >
                <form >
                  <Input
                    type='text'
                    placeholder={'请填写谷歌验证码'}
                    value={googleCode}
                    // msg={passwordMsg}
                    onChange={(value) => {
                      changeState({
                        googleCode: value
                      })
                    }}

                    onClear={() => {
                      changeState({
                        googleCode: '',
                      })
                    }}

                    iconPrefix={(
                      vertifycodepng
                    )}
                  />
                  <Button
                    loading={loading.effects[`${modelName}/doVertifyLogin`]}
                    className={classNames(
                      styles.formbutton,
                      email && userId && googleCode ? styles.permit : styles.notpermit
                    )}
                    onClick={(e) => {
                      e.preventDefault()
                      this.doVertifyLogin()
                    }} >
                    <button >登录</button >
                  </Button >
                </form >
              </div >
            ) : null
          }

        </div >
      </Structure >
    )
  }
}

