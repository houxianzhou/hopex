import React, { Component } from 'react';
import { Input } from './input';
import * as styles from './MyAccount.less';
import { Patterns, classNames } from '@utils'

export default class ChangePassword extends Component {

  state = {
    oldPassword: '',
    oldPasswordMsg: '',
    newPassword: '',
    newPasswordMsg: '',
    repeatNewPassword: '',
    repeatNewPasswordMsg: '',
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.handleInputStatus()) {
      console.log(this.state);
      this.props.submitPassword(
        this.state.oldPassword,
        this.state.newPassword
      )
    }
  }

  changeState = (payload = {}) => {
    this.setState(payload)
  };

  handleInputStatus() {
    return Patterns.password.test(this.state.newPassword)
      && Patterns.password.test(this.state.repeatNewPassword)
      && this.state.newPassword === this.state.repeatNewPassword
      && Patterns.password.test(this.state.oldPassword);
  }

  render() {
    const { oldPassword, oldPasswordMsg, newPassword, newPasswordMsg, repeatNewPassword, repeatNewPasswordMsg } = this.state;
    const { changeState } = this;
    const PASSWORD = 'wuxioahui';

    return (
      <div className={styles.changePassword} >
        <p className={styles.title} >修改密码</p >
        <p className={styles.passwordTip} ><span className={styles.asterisk} >* </span > 重置密码后24小时内不能提现</p >
        <form action="" className={styles.formPart} >
          <div className={styles.passwordItem} >
            <p className={styles.inputTitle} >原密码<span className={styles.asterisk} > *</span ></p >
            <Input
              className={styles.inputContainer}
              type='text'
              value={oldPassword}
              msg={oldPasswordMsg}
              onChange={(value) => {
                changeState({
                  oldPassword: value
                })
              }}
              onCheck={(value) => {
                if (value && !Patterns.password.test(value)) {
                  changeState({
                    oldPasswordMsg: '密码必须包含大写字母、小写字母和数字，8-16位'
                  })
                } else {
                  changeState({
                    oldPasswordMsg: ''
                  })
                }
              }}
            />
          </div >
          <div className={styles.passwordItem} >
            <p className={styles.inputTitle} >新密码<span className={styles.asterisk} > *</span ></p >
            <Input
              className={styles.inputContainer}
              type='password'
              value={newPassword}
              msg={newPasswordMsg}
              onChange={(value) => {
                changeState({
                  newPassword: value
                })
              }}
              onCheck={(value) => {
                if (value && !Patterns.password.test(value)) {
                  changeState({
                    newPasswordMsg: '密码必须包含大写字母、小写字母和数字，8-16位'
                  })
                } else {
                  changeState({
                    newPasswordMsg: ''
                  })
                }
              }}
            />
          </div >
          <div className={styles.passwordItem} >
            <p className={styles.inputTitle} >确认新密码<span className={styles.asterisk} > *</span ></p >
            <Input
              className={styles.inputContainer}
              type='password'
              value={repeatNewPassword}
              msg={repeatNewPasswordMsg}
              onChange={(value) => {
                changeState({
                  repeatNewPassword: value
                })

              }}
              onCheck={(value) => {
                console.log(this.state);
                if (value && !Patterns.password.test(value)) {
                  changeState({
                    repeatNewPasswordMsg: '密码必须包含大写字母、小写字母和数字，8-16位'
                  })
                } else if (Patterns.password.test(this.state.newPassword)
                  && Patterns.password.test(value)
                  && this.state.newPassword !== value) {
                  changeState({
                    repeatNewPasswordMsg: '两次输入的密码不一致'
                  })
                } else {
                  changeState({
                    repeatNewPasswordMsg: ''
                  })
                }
              }}
            />
          </div >
          <button
            className={classNames(
              styles.submit,
              this.handleInputStatus() && styles.inputSuccess
            )}
            onClick={this.handleSubmit} >提交
          </button >
        </form >
      </div >
    )
  }
}
