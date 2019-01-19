import React, { Component } from 'react'
import { Button, CountDown } from '@components'
import { classNames, } from '@utils'
import { connect } from 'dva'
import Input from '@routes/Components/Input'
import * as styles from './GoogleCodeVertify.less'


@connect(({ modal, asset, user, Loading }) => ({
  user,
  model: asset,
  modal,
  loading: Loading
}))
export default class GoogleCodeVertify extends Component {
  render() {
    const {
      className,
      user: { userInfo: { email = '' } = {} } = {},
      emailCode = '', emailCodeChange,
      googleCode = '', googleCodeChange,
      countDown, loadingEffect, onSubmit
    } = this.props
    return (
      <div className={
        classNames(
          styles.googlecodevertify,
          className
        )
      }>
        <ul className={styles.userinput} >
          <li >
            <div className={styles.label} >邮箱</div >
            <div className={styles.email} >
              {email}
            </div >
          </li >
          <li >
            <div className={styles.label} >邮箱验证码</div >
            <div className={styles.input} >
              <Input
                placeholder={'请输入邮箱验证码'}
                value={emailCode}
                onChange={(value) => {
                  emailCodeChange(value)
                }} >
                <CountDown
                  action={false}
                  onClick={() => {
                    countDown()
                  }}
                  beginText='发送'
                />
              </Input >
            </div >
          </li >
          <li >
            <div className={styles.label} >谷歌验证码</div >
            <div className={styles.input} >
              <Input
                value={googleCode}
                placeholder={'请输入谷歌验证码'}
                onChange={(value) => {
                  googleCodeChange(value)
                }} /></div >
          </li >
          <li >
            <div className={styles.label} ></div >
            <div className={styles.calcu} >
              <div className={
                classNames(
                  styles.button,
                  (emailCode && googleCode) ? styles.permit : null
                )
              } >
                <Button
                  loading={loadingEffect}
                  onClick={() => {
                    onSubmit()
                  }} >
                  提交
                </Button >
              </div >

            </div >
          </li >
        </ul >
      </div >
    )
  }
}
