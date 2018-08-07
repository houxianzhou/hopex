import React, { Component } from 'react'
import { connect } from 'dva'
import { ShowJsonTip, Input, Toast } from '@components'
import { classNames, _, Patterns, localSave } from '@utils'
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
  componentDidMount() {
    const newPasswordSave = localSave.get('newPassword') || localSave.get('recordEmail') || {}
    const { email, newPassword } = newPasswordSave
    if (email && newPassword) {
      this.changeState({ email, password: '' })//密码不填
      Toast.tip('重置密码成功')
      localSave.remove('newPassword')
    } else {
      if (email) {
        this.changeState({ email })
      }
    }

  }

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
    const { dispatch, modelName, } = this.props
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

                  <svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" >

                  <g id="00_全局" stroke="none"  fill="none" >
                  <g id="04-登录页_已填写" transform="translate(-730.000000, -526.000000)">
                  <g id="Group-7" transform="translate(730.000000, 526.000000)">
                  <g id="Group-4">
                  <g id="Group-3" transform="translate(1.000000, 4.000000)">
                  <polygon id="Path-2" fill="#FFF6E5" points="0 4.53154631 14.4469766 12 28 4.94672246 26.9122512 1 1.93598384 1"></polygon>
                  <path d="M2,2 L2,20 L26,20 L26,2 L2,2 Z M2,0 L26,0 C27.1045695,-2.02906125e-16 28,0.8954305 28,2 L28,20 C28,21.1045695 27.1045695,22 26,22 L2,22 C0.8954305,22 1.3527075e-16,21.1045695 0,20 L0,2 C-1.3527075e-16,0.8954305 0.8954305,2.02906125e-16 2,0 Z" id="Rectangle" fill="#E2B96F" ></path>
                  <path d="M14.245274,10.9924973 L26.2404645,4.06707079 C26.4796109,3.9289996 26.7854061,4.01093718 26.9234772,4.25008349 L27.4234772,5.11610889 C27.5615484,5.3552552 27.4796109,5.66105041 27.2404645,5.79912159 L15.1016805,12.8074518 L14.9234772,13.1161089 C14.7863299,13.353655 14.4836957,13.4360892 14.245274,13.3018637 C14.0068524,13.4360892 13.7042181,13.353655 13.5670708,13.1161089 L13.3888676,12.8074518 L1.25008349,5.79912159 C1.01093718,5.66105041 0.928999598,5.3552552 1.06707079,5.11610889 L1.56707079,4.25008349 C1.70514197,4.01093718 2.01093718,3.9289996 2.25008349,4.06707079 L14.245274,10.9924973 Z" id="Combined-Shape" fill="#E2B96F"></path>
                  </g>
                  </g>
                  </g>
                  </g>
                  </g>
                  </svg>
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

                // onCheck={(value) => {
                //   if (value && !Patterns.password.test(value)) {
                //     changeState({
                //       passwordMsg: ' 密码必须包含大写字母、小写字母和数字，8-16位'
                //     })
                //   } else {
                //     changeState({
                //       passwordMsg: '',
                //     })
                //   }
                // }}

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
              >注册
              </div >
            </div >
          </div >
        </div >
      </Structure >
    )
  }
}

