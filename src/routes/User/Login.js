import React, { Component } from 'react'
import { connect } from 'dva'
import { ShowJsonTip, Input } from '@components'
import { classNames, _ } from '@utils'
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
    password: ''
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
    const { email, password } = this.state
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
              <button
                className={classNames(
                  styles.formbutton,
                  email && password ? styles.permit : styles.notpermit
                )}
                onClick={(e) => {
                  e.preventDefault()
                  e.preventDefault()
                  this.login()
                }} >
                <span
                  onClick={(e) => {
                    e.preventDefault()
                    changeState(person1)
                  }} >1</span >
                登录
                <span onClick={(e) => {
                  e.preventDefault()
                  changeState(person2)
                }} >2</span >
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
              <div >忘记密码</div >
              <div
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

