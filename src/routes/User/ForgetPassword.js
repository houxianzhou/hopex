import React, { Component } from 'react'
import { connect } from 'dva'
import { ToastContainer, toast } from 'react-toastify'
import { ShowJsonTip, Select, Input, CountDown } from '@components'
import { classNames, _ } from '@utils'
import { default as Structure } from './components/Structure'
import emailpng from '@assets/email.png'
import vertifycodepng from '@assets/vertifycode.png'
import passwordpng from '@assets/password.png'
import styles from './index.less'

@connect(({ user: model, loading, dispatch }) => ({
  model,
  modelName: 'user',
  dispatch
}))
export default class View extends Component {

  state = {
    page: 1,
    email: '',
    password: '',
    newPassword: '',
    verificationCode: '',
  }

  changeState = (payload = {}) => {
    this.setState(payload)
  }

  render() {
    const { changeState } = this
    const {
      page, email, verificationCode, password, newPassword
    } = this.state
    const { dispatch, modelName } = this.props

    return (
      <Structure >
        <div className={styles.forgetPassword} >
          {
            page === 1 ? (
              <div className={styles.page1} >
                <div className={styles.top} >
                  重置密码
                </div >
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

                    <button
                      className={classNames(
                        styles.formbutton,
                        email ? styles.permit : styles.notpermit
                      )}
                      onClick={(e) => {
                        e.preventDefault()
                        dispatch({
                          type: `${modelName}/doEmailExists`,
                          payload: {
                            email
                          }
                        }).then(res => {
                          if (res) {
                            changeState({
                              page: 2
                            })
                          }
                        })
                      }}
                    >
                      下一步
                    </button >
                  </form >
                </div >
              </div >
            ) : (
              <div className={styles.page2} >
                <div className={styles.top} >
                  重置密码
                  <div className={styles.desc} ><span >*</span >重置密码后24小时内不能提现</div >
                </div >
                <div className={styles.info} >
                  <div className={styles.name} >邮箱</div >
                  <div className={styles.email} >{email}</div >
                </div >
                <div className={styles.center} >
                  <form >
                    <Input
                      type='text'
                      placeholder={'请输入验证码'}
                      value={verificationCode}
                      onChange={(e) => {
                        changeState({
                          verificationCode: e.target.value
                        })
                      }}
                      iconPrefix={(
                        <img alt='vertifycode' src={vertifycodepng} />
                      )}
                      iconPost={(
                        <div className={styles.resend} >
                          <CountDown auto onClick={() => {
                            dispatch({
                              type: `${modelName}/doSendEmailCode`,
                              payload: { email }
                            })
                          }} />
                        </div >
                      )}
                    />
                    <Input
                      type='password'
                      placeholder={'请输入新密码'}
                      value={password}
                      style={{
                        iconPost: {
                          width: 91
                        }
                      }}
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
                      type='password'
                      placeholder={'请再输入新密码'}
                      value={newPassword}
                      style={{
                        iconPost: {
                          width: 91
                        }
                      }}
                      onChange={(e) => {
                        changeState({
                          newPassword: e.target.value
                        })
                      }}

                      onClear={() => {
                        changeState({
                          newPassword: ''
                        })
                      }}

                      iconPrefix={(
                        <img alt='password' src={passwordpng} />
                      )}
                    />

                    <button
                      className={classNames(
                        styles.formbutton,
                        email ? styles.permit : styles.notpermit
                      )}
                      onClick={(e) => {
                        e.preventDefault()
                        dispatch({
                          type: `${modelName}/doVertifyCode`,
                          payload: {
                            email,
                            verificationCode
                          }
                        }).then(res => {
                          if (res) {
                            dispatch({
                              type: `${modelName}/doResetPassword`,
                              payload: {
                                email,
                                newPassword
                              }
                            })
                          }
                        })
                      }}
                    >
                      提交
                    </button >
                  </form >
                </div >
              </div >
            )
          }
        </div >
      </Structure >
    )
  }
}

