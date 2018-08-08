import React, { Component } from 'react';
import * as styles from './checkEmail.less';
import { CountDown } from "@components";
import { classNames } from '@utils';
import { Input } from './input.js'

export default class CheckEmail extends Component {
  state = {
    info: '123',
    code: '',
  }

  render() {
    const {
      type = 'open',
      sendEmailFunc = () => {},
      submitEmailCode= () => {},
      email = ''
    } = this.props;
    const { code } = this.state;
    return (
      <div className={styles.checkEmail} >
        <p className={styles.title} >邮箱验证码</p >
        <p className={styles.passwordTip} ><span
          className={styles.asterisk} >* </span > {type === 'close' ? '关闭' : '开启'}谷歌二次验证后24小时内不能提现</p >
        <form action="" >
          <div className={classNames(
            styles.passwordItem,
            styles.emailItem
          )} >
            <p className={styles.inputTitle} >邮箱</p >
            <p className={styles.inputTitle} >{email}</p >
          </div >
          <div className={styles.passwordItem} >
            <p className={styles.inputTitle} >邮箱验证码</p >
            <Input
              className={styles.inputContainer}
              type="text"
              placeholder="请输入邮箱验证码"
              onChange={(value) => {
                this.setState({
                  code: value
                })
              }}
              value={this.state.code}
              CountDown={(<div className={styles.resend} >
                <CountDown style={{ color: '#E2B96F' }} action={true} onClick={sendEmailFunc} />
              </div >)}
            />
          </div >
        </form >
        <button
          className={classNames(
            styles.submit,
            code && styles.inputSuccess
          )}
          onClick={() => {
            if (!code) return;
            submitEmailCode(code);
          }} >确认
        </button >
      </div >
    )
  }
}
