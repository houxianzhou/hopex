import React, { Component } from 'react'
import { connect } from 'dva'
import { ToastContainer, toast } from 'react-toastify'
import { ShowJsonTip, Select, Input, CountDown } from '@components'
import { classNames, _, Patterns } from '@utils'
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
    emailMsg: '',
    newPassword: '',
    newPasswordMsg: '',
    newPasswordAgain: '',
    newPasswordMsgAgainMsg: '',
    verificationCode: '',
  }

  changeState = (payload = {}) => {
    this.setState(payload)
  }


  render() {

    const { changeState } = this
    const {
      page, email, emailMsg, verificationCode, newPassword, newPasswordMsg, newPasswordAgain, newPasswordAgainMsg
    } = this.state
    const { dispatch, modelName } = this.props

    return (
      <Structure goBack={page !== 1 ? () => {
        changeState({ page: page - 1 })
      } : null} >
        <div className={styles.forgetPassword} >
          {
            page === 1 ? (
              <div className={styles.page2} >
                <div className={styles.top} >
                  重置密码
                  <div className={styles.desc} ><span >*</span >重置密码后24小时内不能提现</div >
                </div >
                <div className={styles.center} >
                  <form >
                    <Input
                      type='text'xf
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
                      iconPrefix={(
                        <img alt='email' src={emailpng} />
                      )}
                    />

                    <button
                      className={classNames(
                        styles.formbutton,
                        email && !emailMsg ? styles.permit : styles.notpermit
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
            ) : null
          }
          {
            page === 2 ? (
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
                      onChange={(value) => {
                        changeState({
                          verificationCode: value
                        })
                      }}
                      iconPrefix={(
                        <img alt='vertifycode' src={vertifycodepng} />
                      )}
                      iconPost={(
                        <div className={styles.resend} >
                          <CountDown action={true} onClick={() => {
                            dispatch({
                              type: `${modelName}/doSendEmailCode`,
                              payload: { email }
                            })
                          }} />
                        </div >
                      )}
                    />


                    <button
                      className={classNames(
                        styles.formbutton,
                        email && verificationCode ? styles.permit : styles.notpermit
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
                            changeState({
                              page: 3
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
            ) : null
          }
          {
            page === 3 ? (
              <div className={styles.page2} >
                <div className={styles.top} >
                  重置密码
                  <div className={styles.desc} ><span >*</span >重置密码后24小时内不能提现</div >
                </div >
                <div className={styles.center} >
                  <form >
                    <Input
                      type='password'
                      placeholder={'请输入新密码'}
                      value={newPassword}
                      msg={newPasswordMsg}
                      style={{
                        iconPost: {
                          width: 91
                        }
                      }}
                      onChange={(value) => {
                        changeState({
                          newPassword: value
                        })
                      }}
                      onCheck={(value) => {
                        const test1 = value && !Patterns.password.test(value)
                        if (test1) {
                          changeState({
                            newPasswordMsg: ' 密码必须包含大写字母、小写字母和数字，8-16位'
                          })
                        } else if (newPasswordAgain && value !== newPasswordAgain) {
                          changeState({
                            newPasswordMsg: '两次输入的密码不一致',
                            // newPasswordAgainMsg: '两次输入的密码不一致',
                          })
                        } else {
                          changeState({
                            newPasswordMsg: '',
                            newPasswordAgainMsg: ''
                          })
                        }
                      }}

                      onClear={() => {
                        changeState({
                          newPassword: '',
                          newPasswordMsg: ''
                        })
                      }}

                      iconPrefix={(
                        <img alt='newPassword' src={passwordpng} />
                      )}
                    />
                    <Input
                      type='password'
                      placeholder={'请再输入新密码'}
                      value={newPasswordAgain}
                      msg={newPasswordAgainMsg}
                      style={{
                        iconPost: {
                          width: 91
                        }
                      }}
                      onChange={(value) => {
                        changeState({
                          newPasswordAgain: value
                        })
                      }}
                      onCheck={(value) => {
                        const test1 = value && !Patterns.password.test(value)
                        if (test1) {
                          changeState({
                            newPasswordAgainMsg: '密码必须包含大写字母、小写字母和数字，8-16位'
                          })
                        } else if (newPassword && value !== newPassword) {
                          changeState({
                            // newPasswordMsg: '新的密码两次输入必须一致',
                            newPasswordAgainMsg: '两次输入的密码不一致',
                          })
                        } else {
                          changeState({
                            newPasswordMsg: '',
                            newPasswordAgainMsg: ''
                          })
                        }
                      }}

                      onClear={() => {
                        changeState({
                          newPasswordAgain: '',
                          newPasswordAgainMsg: ''
                        })
                      }}

                      iconPrefix={(
                        <img alt='password' src={passwordpng} />
                      )}
                    />

                    <button
                      className={classNames(
                        styles.formbutton,
                        email && newPassword && !newPasswordMsg && newPasswordAgain && !newPasswordAgainMsg ? styles.permit : styles.notpermit
                      )}
                      onClick={(e) => {
                        e.preventDefault()
                        dispatch({
                          type: `${modelName}/doResetPassword`,
                          payload: {
                            email,
                            newPassword
                          }
                        })
                      }}
                    >
                      提交
                    </button >
                  </form >
                </div >
              </div >
            ) : null
          }
        </div >
      </Structure >
    )
  }
}

