import React, { Component, Fragment } from 'react'
import { connect } from 'dva'
import { ShowJsonTip, NavPannel, Table } from '@components'
import circle from '@assets/circle.png'
import ChangePassword from './changePassword';
import CheckEmail from './checkEmail'
import CloseGoogle from './closeGoogle';
import { Input } from './input';
import { classNames, _, Patterns } from '@utils'
import { PATH } from '@constants'
import styles from './MyAccount.less'
import { rightIcon, errorIcon } from '@assets/'

@connect(({ account: model, dispatch, theme }) => ({
  model,
  dispatch,
  theme,
  modelName: 'account'
}))
export default class View extends Component {

  renderStatus = (status) => {
    return status ? (
      <div className={styles.right} >
        {rightIcon}
      </div >
    ) : (
      <div className={
        classNames(
          styles.right,
          styles.error
        )
      } >
        {errorIcon}
      </div >
    )
  }

  state = {
    googleIdentifyingCode: '',
    googleIdentifyingCodeMsg: '',
    qrImageUrl: '', // 二维码
    securityCode: '', // 安全密钥
    loginList: [],
    // email: this.props.user.userInfo.email,
    userInfo: {}
  };
  componentDidMount = () => {
    console.log(this.props);
    this.props.dispatch({
      type: `${this.props.modelName}/GetLast10LoginLog`
    }).then((res = {}) => {
      // console.log(res)
      const { data = [] } = res;
      if (data) {
        this.setState({
          loginList: data
        })
      }
    });
    this.props.dispatch({
      type: `${this.props.modelName}/GetUserInfo`
    }).then((res = {}) => {
      // console.log(res);
      const { data = {} } = res;
      if (data) {
        this.setState({
          userInfo: data
        })
      }
    })
  };

  changeState(props) {
    this.setState(props);
  }

  render() {
    const { model: { myAccountPage: page }, modelName, dispatch, theme: { calculateTableHeight } } = this.props;
    const { googleIdentifyingCode, qrImageUrl, securityCode, userInfo: { email = '', country = '', lastLoginTime = '', lastLoginIp = '', enabledTwoFactories = '' }, loginList = [] } = this.state;
    const { renderStatus } = this;
    const columns = [
      {
        title: '时间',
        dataIndex: 'time'
      },
      {
        title: 'IP地址',
        dataIndex: 'ip'
      },
      {
        title: '所在地',
        dataIndex: 'ipCountry'
      }
    ];
    const tableProps = {
      columns,
      dataSource: loginList,
      style: {
        table: {
          height: 200
        }
      },
      classNames: styles.loginrecord,
      scroll: {},
    }

    const page1 = (
      <>
        <div className={styles.header} >
          <div className={styles.left} >
            <div className={styles.email} >{email}</div >
            <div className={styles.country} >{country}</div >
          </div >
          <div className={styles.right} >
            <div >最后登录时间 :<span >{lastLoginTime}</span ></div >
            <div >IP :<span >{lastLoginIp}</span ></div >
          </div >
        </div >
        <div className={styles.down} >
          <div className={styles.safety} >
            <div className={styles.title} >安全设置</div >
            <ul >
              <li >
                <div className={styles.name} >登录密码</div >
                <div className={classNames(
                  styles.desc,
                  styles.loginpassword
                )} >
                  已设置
                  {renderStatus(true)}
                </div >
                <div
                  className={
                    classNames(
                      styles.button,
                      styles.login
                    )
                  }
                  onClick={() => {
                    dispatch({
                      type: `${modelName}/changeState`,
                      payload: {
                        myAccountPage: 3
                      }
                    })
                  }}
                >
                  修改
                </div >
              </li >
              <li >
                <div className={styles.name} >谷歌二次验证</div >
                <div className={classNames(
                  styles.desc,
                  styles.google
                )} >
                  提现，修改密码，及安全设置时用以输入谷歌验证码
                  {renderStatus(enabledTwoFactories)}
                </div >
                {
                  enabledTwoFactories ? (
                    <div
                      className={classNames(
                        styles.button,
                        styles.login
                      )}
                      onClick={() => {
                        dispatch({
                          type: `${modelName}/changeState`,
                          payload: {
                            myAccountPage: 5
                          }
                        })
                      }} >
                      已启用
                    </div >
                  ) : (
                    <div
                      className={classNames(
                        styles.button,
                        styles.googlebutton
                      )}
                      onClick={() => {
                        dispatch({
                          type: `${this.props.modelName}/GetEnableGoogleVertifyCode`,
                        }).then((res = {}) => {
                          // console.log(res)
                          if (!res.data) return;
                          const { qrImageUrl = '', securityCode = '' } = res.data;
                          this.setState({
                            qrImageUrl: qrImageUrl || '',
                            securityCode: securityCode || '',
                          })
                        });
                        dispatch({
                          type: `${modelName}/changeState`,
                          payload: {
                            myAccountPage: 2
                          }
                        })
                        this.setState({
                          googleIdentifyingCode: ''
                        })
                      }} >
                      启用
                    </div >
                  )
                }
              </li >
            </ul >
          </div >
          <div className={styles.recentRecord} >
            <div className={styles.recordheader} >
              最近10条登录记录
            </div >
            <div style={{ height: calculateTableHeight(loginList, 50, 50) }} >
              <Table {...tableProps} />
            </div >
          </div >
        </div >
      </>
    )

    const page2 = (
      <Fragment >
        <p className={styles.openGoogleTitle} >启用谷歌二次验证</p >
        <div className={styles.lineContainer} >
          <div className={styles.stepLine} ></div >
          <div className={styles.lineItem} >
            <div className={styles.leftItem} >
              <img className={styles.circle} src={circle} alt="" />
              <div className={styles.step} >Step1</div >
            </div >
            <div className={styles.rightItem} >
              <p className={styles.description} >下载并安装谷歌验证器APP</p >
              <p className={styles.content} >
                iOS用户登录App Store搜索“Authenticator”下载；<br />
                安卓用户登录应用商店或使用手机浏览器搜索“谷歌验证器”下载；
              </p >
              <div className={styles.buttonContainer} >
                <div className={styles.buttonItem} >
                  <a href="https://itunes.apple.com/us/app/google-authenticator/id388497605?mt=8"
                     target="_blank" >iPhone下载</a >
                </div >
                <div className={styles.buttonItem} >
                  <a href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2"
                     target="_blank" >Andriod下载</a >
                </div >
              </div >
            </div >
          </div >
          <div className={styles.lineItem} >
            <div className={styles.leftItem} >
              <img className={styles.circle} src={circle} alt="" />
              <div className={styles.step} >Step2</div >
            </div >
            <div className={styles.rightItem} >
              <p className={styles.description} >使用谷歌验证器APP扫描该二维码</p >
              <div className={styles.step2Container} >
                <div className={styles.codeLeft} >
                  <p className={styles.content} >
                    使用谷歌验证器APP扫描该二维码,如果您无法扫描二维码，可以将该16位密钥手动输入到谷歌验证APP中
                  </p >
                  <p className={classNames(
                    styles.content,
                    styles.passwordContainer
                  )} >
                    密钥：<br />
                    <span className={styles.password} >{securityCode}</span >
                  </p >
                </div >
                <div className={styles.codeRight} >
                  <img className={styles.codeImg} src={qrImageUrl && qrImageUrl} alt="" />
                </div >
              </div >
            </div >
          </div >
          <div className={styles.lineItem} >
            <div className={styles.leftItem} >
              <img className={styles.circle} src={circle} alt="" />
              <div className={styles.step} >Step3</div >
            </div >
            <div className={styles.rightItem} >
              <p className={styles.description} >在谷歌验证器中备份密钥</p >
              <p className={styles.content} >
                <span className={styles.asterisk} >* </span >请将16位密钥记录在纸上，并保存在安全的地方。如遇手机丢失，你可以通过该密钥恢复你的谷歌验证。
              </p >
            </div >
          </div >
          <div className={classNames(
            styles.lineItem,
            styles.lastItem
          )} >
            <div className={styles.leftItem} >
              <img className={styles.circle} src={circle} alt="" />
              <div className={styles.step} >Step4</div >
            </div >
            <div className={styles.rightItem} >
              <p className={styles.description} >输入谷歌验证器中的6位验证码进行验证</p >
              <div className={styles.googleCode} >
                <div className={styles.label} >谷歌验证码</div >
                <Input
                  onChange={(value) => {
                    this.changeState({
                      googleIdentifyingCode: value
                    })
                  }}
                  value={googleIdentifyingCode}
                  placeholder="请输入谷歌验证码" />
              </div >
            </div >
          </div >
          <button
            className={classNames(
              styles.openGoogle,
              !googleIdentifyingCode && styles.disabled
            )}
            onClick={() => {
              if (!googleIdentifyingCode) {
                return;
              }
              dispatch({
                type: `${this.props.modelName}/CheckGoogleCode`,
                payload: {
                  googleCode: googleIdentifyingCode
                }
              }).then((res) => {
                if (res) {
                  dispatch({
                    type: `${modelName}/changeState`,
                    payload: {
                      myAccountPage: 4
                    }
                  })
                }
              })
            }}
          >开启
          </button >
        </div >
      </Fragment >
    );

    const closeGoogleEmailPage = (
      <CheckEmail
        type="close"
        email={email}
        sendEmailFunc={() => {
          dispatch({
            type: `${this.props.modelName}/SendEmailToDisableTwoFacotires`,
            payload: {
              email
            }
          })
        }}
        submitEmailCode={(code) => {
          console.log(code)
          if (!code) {
            return;
          }
          console.log(code)
          dispatch({
            type: `${this.props.modelName}/doDisbaleGoogleVertify`,
            payload: {
              verificationCode: code || '',
            },
          })
        }}
      />
    )

    const openGooglePage = (
      <CheckEmail
        type="open"
        email={email}
        sendEmailFunc={() => {
          dispatch({
            type: `${this.props.modelName}/SendEmailToEnableTwoFacotires`,
            payload: {
              email
            }
          })
        }}
        submitEmailCode={(code) => {
          dispatch({
            type: `${this.props.modelName}/doEnableGoogleVertify`,
            payload: {
              verificationCode: code || ''
            }
          })
        }}
      />
    )

    const closeGoogle = (
      <CloseGoogle
        submitGoogleCode={(code) => {
          dispatch({
            type: `${this.props.modelName}/CheckGoogleCode`,
            payload: {
              googleCode: code,
            }
          }).then((res) => {
            if (res) {
              dispatch({
                type: `${modelName}/changeState`,
                payload: {
                  myAccountPage: 6
                }
              })
            }
          })
        }}
      />
    );
    const changePassword = (
      <ChangePassword
        submitPassword={(oldPassword, newPassword) => {
          dispatch({
            type: `${modelName}/ModifyPassword`,
            payload: {
              param: {
                oldPassword,
                newPassword
              }
            }
          })
        }}
      />
    );

    // const page3 = (
    //
    // )

    return (
      <div className={styles.myaccount} >
        {
          page === 1 ? page1 : (page === 2 ? page2 : (page === 3 ? changePassword : (page === 4 ? openGooglePage : page === 5 ? closeGoogle : page === 6 ? closeGoogleEmailPage : null)))
        }
      </div >
    )
  }
}

