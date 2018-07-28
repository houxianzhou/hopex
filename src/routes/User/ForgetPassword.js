import React, { Component } from 'react'
import { connect } from 'dva'
import { ToastContainer, toast } from 'react-toastify'
import { ShowJsonTip, Select, Input } from '@components'
import { classNames, _ } from '@utils'
import { default as Structure } from './components/Structure'
import emailpng from '@assets/email.png'
import styles from './index.less'

@connect(({ user: model, loading, dispatch }) => ({
  model,
  modelName: 'user',
  dispatch
}))
export default class View extends Component {

  state = {
    page: 1,

    password: '',
    email: '2278095567@qq.com',
    verificationCode: '',
  }


  changeState = (payload = {}) => {
    this.setState(payload)
  }

  render() {
    const { changeState } = this
    const {
      page, email, verificationCode, password
    } = this.state
    const { dispatch, modelName } = this.props

    return (
      <Structure >
        <div className={styles.register} >
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
            ) : null
          }
        </div >
      </Structure >
    )
  }
}

