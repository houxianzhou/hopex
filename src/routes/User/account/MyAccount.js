import React, { Component, Fragment } from 'react'
import { connect } from 'dva'
import { ShowJsonTip, NavPannel, Table } from '@components'
import circle from '@assets/circle.png'
import ChangePassword from './changePassword';
import { Input } from './input';
import { classNames, _, Patterns } from '@utils'
import { PATH } from '@constants'
import styles from './MyAccount.less'

@connect(({ account: model, dispatch}) => ({
  model,
  dispatch,
  modelName: 'account'
}))
export default class View extends Component {

  renderStatus = (status) => {
    return status ? (
      <div className={styles.right} >
        √
      </div >
    ) : (
      <div className={
        classNames(
          styles.right,
          styles.error
        )
      } >
        x
      </div >
    )
  }

  state = {
    googleIdentifyingCode: '',
    googleIdentifyingCodeMsg: ''
  };
  componentDidMount = () => {
    console.log(this.props);
    this.props.dispatch({
      type: `${this.props.modelName}/GetEnableGoogleVertifyCode`,
      payload: PATH.forgetPassword
    })
  };
  changeState(props) {
    this.setState(props);
  }

  render() {
    const { model: { myAccountPage: page }, modelName, dispatch } = this.props;
    const {googleIdentifyingCodeMsg} = this.state;
    const { renderStatus } = this;
    const columns = [
      {
        title: '时间',
        dataIndex: 'time'
      },
      {
        title: '时间',
        dataIndex: 'time'
      },
      {
        title: '时间',
        dataIndex: 'time'
      }
    ]
    const tableProps = {
      columns,
      dataSource: [
        {
          time: '20:09:14'
        }
      ],
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
            <div className={styles.email} >2278095567@qq.com</div >
            <div className={styles.country} >中国</div >
          </div >
          <div className={styles.right} >
            <div >最后登录时间 :<span >2018-04-25</span ></div >
            <div >Ip :<span >121.29.15.199</span ></div >
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
                <div className={styles.name} >谷歌验证码</div >
                <div className={classNames(
                  styles.desc,
                  styles.google
                )} >
                  提现，修改密码，及安全设置时用以输入谷歌验证码
                  {renderStatus(false)}
                </div >
                <div
                  className={classNames(
                    styles.button,
                    styles.googlebutton
                  )}
                  onClick={() => {
                    dispatch({
                      type: `${modelName}/changeState`,
                      payload: {
                        myAccountPage: 2
                      }
                    })
                  }} >
                  修改
                </div >
              </li >
            </ul >
          </div >
          <div className={styles.recentRecord} >
            <div className={styles.recordheader} >
              最近10条登录记录
            </div >
            <Table {...tableProps} />
          </div >
        </div >
      </>
    )

    const page2 = (
      <Fragment >
        <p className={styles.openGoogleTitle} >启用谷歌二次验证</p >
        <div className={styles.lineContainer} >
          <div className={styles.stepLine}></div>
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
                <div className={styles.buttonItem} >iPhone下载</div >
                <div className={styles.buttonItem} >Andriod下载</div >
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
                    密码：<br />
                    <span className={styles.password} >GM3WENDBG42WCYRU</span >
                  </p >
                </div >
                <div className={styles.codeRight} >
                  <img className={styles.codeImg} src={circle} alt="" />
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
              <p className={classNames(
                styles.content,
                styles.passwordContainer,
              )} >密钥 <span className={styles.password} > &nbsp;&nbsp;GM3WENDBG42WCYRU</span ></p >
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
                <div className={styles.label}>谷歌验证码</div>
                <Input
                  onChange={(value) => {
                    this.changeState({
                      googleIdentifyingCode: value
                    })
                  }}
                  msg={googleIdentifyingCodeMsg}
                  placeholder="请输入谷歌验证码"/>
              </div >
            </div >
          </div >
          <button className={styles.openGoogle}>开启</button>
        </div >
      </Fragment >
    )

    // const page3 = (
    //
    // )

    return (
      <div className={styles.myaccount} >
        {
          page === 1 ? page1 : (page === 2 ? page2 : (page === 3 ? (<ChangePassword />) : null))
        }
      </div >
    )
  }
}

