import React, { Component } from 'react'
import { connect } from 'dva'
import { ShowJsonTip, Input } from '@components'
import { classNames, _, Patterns } from '@utils'
import { PATH } from '@constants'
import logo2 from '@assets/logo2.png'
import emailpng from '@assets/email.png'
import passwordpng from '@assets/password.png'
import { default as Structure } from './components/Structure'
import styles from './index.less'

@connect(({ user: model, loading, dispatch }) => ({
  model,
  modelName: 'user',
  dispatch
}))
export default class View extends Component {
  state = {
    email: '',
    emailMsg: '',
    password: '',
    passwordMsg: ''
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
    const person1 = {
      email: 'xiaoyi.wei@bcsystech.com',
      password: '8888888'
    }
    const person2 = {
      email: '2278095567@qq.com',
      password: '8888888'
    }
    const { changeState } = this
    const { email, emailMsg, password, passwordMsg } = this.state
    const { dispatch, modelName } = this.props
    return (
      <Structure >
        <div className={styles.login} >
          <div className={styles.top} >
            <div className={styles.logo} >
              <img alt='logo' src={logo2} />
            </div >
            <div className={styles.name} >Hopex</div >
            <div className={styles.desc} >全球领先的数字资产衍生品交易平台</div >
          </div >
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
                      emailMsg: '必须符合邮箱格式'
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
              <Input
                type='password'
                placeholder={'请填写密码'}
                value={password}
                msg={passwordMsg}
                onChange={(value) => {
                  changeState({
                    password: value
                  })
                }}

                onCheck={(value) => {
                  if (value && !Patterns.password.test(value)) {
                    changeState({
                      passwordMsg: ' 密码必须包含大写字母、小写字母和数字，8-16位'
                    })
                  } else {
                    changeState({
                      passwordMsg: '',
                    })
                  }
                }}

                onClear={() => {
                  changeState({
                    password: '',
                    passwordMsg: ''
                  })
                }}

                iconPrefix={(
                  <img alt='password' src={passwordpng} />
                )}
              />
              <button
                className={classNames(
                  styles.formbutton,
                  email && !emailMsg && password && !passwordMsg ? styles.permit : styles.notpermit
                )}
                onClick={(e) => {
                  e.preventDefault()
                  e.preventDefault()
                  this.login()
                }} >
                登录
                {/*<span*/}
                {/*onClick={(e) => {*/}
                {/*e.preventDefault()*/}
                {/*changeState(person1)*/}
                {/*}} >1</span >*/}

                {/*<span onClick={(e) => {*/}
                {/*e.preventDefault()*/}
                {/*changeState(person2)*/}
                {/*}} >2</span >*/}
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
            <div className={styles.othermethod} >
              <div
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  dispatch({
                    type: `${modelName}/routerGo`,
                    payload: PATH.forgetPassword
                  })
                }}
              >忘记密码
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
              >注册
              </div >
            </div >
          </div >
        </div >
      </Structure >
    )
  }
}

