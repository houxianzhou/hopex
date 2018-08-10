import React, { Component } from 'react';
import { classNames } from '@utils';
import * as styles from "./closeGoogle.less";
import {Input} from './input.js';

export default class CloseGoogle extends Component {
  state = {
    code: '',
  }
  render() {
    const {code} = this.state;
    const { submitGoogleCode = () => {} } = this.props;
    return (
      <div className={styles.closeGoogle} >
        <p className={styles.title} >
          关闭谷歌二次验证
          {/*<span className={styles.passwordTip}>（若未收到邮件，请检查垃圾箱）</span>*/}
        </p >
        <p className={styles.passwordTip} >
          <span className={styles.asterisk} >* </span >
           关闭谷歌二次验证后24小时内不能提现
        </p >
        <form action="" >
          <div className={styles.passwordItem} >
            <p className={styles.inputTitle} >谷歌验证码</p >
            <Input
              className={styles.inputContainer}
              type="text"
              placeholder="请输入谷歌验证码"
              onChange={(value) => {
                this.setState({
                  code: value
                })
              }}
              value={this.state.code}
            />
          </div>
          <button
            className={classNames(
              styles.submit,
              code && styles.inputSuccess
            )}
            onClick={(e) => {
              e.preventDefault();
              if (!code) return;
              submitGoogleCode(code);
            }} >关闭
          </button >
        </form >

      </div>
    )
  }
}
