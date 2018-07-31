import React, { Component } from 'react'
import { connect } from 'dva'
import { ShowJsonTip, Input, NavPannel, Table } from '@components'
import { classNames, _, Patterns } from '@utils'
import { PATH } from '@constants'
import styles from './MyAccount.less'

@connect(({ account: model, }) => ({
  model,
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

  render() {
    const { model: { myAccountPage: page }, modelName, dispatch } = this.props
    const { renderStatus } = this
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
                  已经设置
                  {renderStatus(true)}
                </div >
                <div
                  className={
                    classNames(
                      styles.button,
                      styles.login
                    )
                  }
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
      <>
        ahhaha
      </>
    )

    return (
      <div className={styles.myaccount} >
        {
          page === 1 ? page1 : (page === 2 ? page2 : null)
        }
      </div >
    )
  }
}

