import React, { Component } from 'react'
import { connect } from 'dva'
import { PATH } from "@constants"
import { Mixin, Button, Table } from '@components'
import { classNames, _, Patterns, } from '@utils'
import MoneySelect from '@routes/Asset/components/MoneySelect'
import Input from '@routes/Components/Input'

import styles from '@routes/Asset/index.less'

@connect(({ modal, asset, user, Loading }) => ({
  user,
  model: asset,
  modal,
  loading: Loading
}))
export default class View extends Component {
  constructor(props) {
    super(props)
    const { model: { detailLegal } } = this.props
    this.state = {
      active: detailLegal[0].assetName,
      rmbAmount: ''
    }
  }

  componentDidMount() {
    this.startInit()
  }

  startInit = () => {
    this.getParams()
  }


  changeMoney = (payload) => {
    this.changeState({ active: payload },
      () => {
        this.getParams()
      }
    )
  }

  getParams = () => {
    this.getExchangeRate()
    this.getBuyParameter()
  }

  getExchangeRate = () => {
    const { dispatch, modelName } = this.props
    const { active, } = this.state
    dispatch({
      type: `${modelName}/getExchangeRate`,
      payload: {
        coinCode: active,
        priceArrow: 'BUY'
      }
    })
  }

  getBuyParameter = () => {
    const { dispatch, modelName } = this.props
    const { active, } = this.state
    dispatch({
      type: `${modelName}/getBuyParameter`,
      payload: {
        coinCode: active,
      }
    })
  }

  buyOTC = () => {
    const { dispatch, modelName } = this.props
    const { active, rmbAmount } = this.state
    dispatch({
      type: `${modelName}/buyOTC`,
      payload: {
        coinCode: active,
        rmbAmount,
        returnUrl: window.location.href
      }
    })
  }


  checkAmount = (value, selectOne) => {
    const { changeState } = this
    if (Patterns.decimalNumber.test(value)) {
      if (value < Number(selectOne.minAmount)) {
        changeState({
          amountMsg: `最小提现数量${selectOne.minAmount}`
        })
      } else if (value > Number(selectOne.maxAmount)) {
        changeState({
          amountMsg: '可提现金额不足'
        })
      } else {
        changeState({
          amountMsg: ''
        })
      }
    } else {
      changeState({
        amountMsg: ''
      })
    }
  }


  render() {
    const { changeState, buyOTC} = this
    const { model: { detailLegal = [], }, user: { userInfo: { email = '' } = {} } = {}, loading, modelName } = this.props
    const { active, rmbAmount } = this.state
    const selectList = detailLegal.map((item = {}) => ({ label: item.assetName, value: item.assetName }))
    const selectItem = selectList.filter((item = {}) => item.label === active)[0]
    const selectOne = detailLegal.filter((item = {}) => item.assetName === active)[0]
    const isNotAllow = () => {
      return selectOne.allowWithdraw === false || selectOne.isValid === false
    }
    const columns = [
      {
        title: '时间',
        dataIndex: 'createdTime',
        width: 100
      },
      {
        title: '类型',
        dataIndex: 'type',
        width: 10
      },
      {
        title: '金额',
        dataIndex: 'amount',
        width: 60
      },
      {
        title: '地址',
        dataIndex: 'addrUrl',
        render: (value, record = {}) => (
          {
            value: (<span className={styles.overflowHidden} onClick={() => {
              window.open(record.addrUrl)
            }} >{record.addr}</span >),
            className: 'blue'
          }
        )
      },
      {
        title: 'TxHash',
        dataIndex: 'txid',
        render: (value, record = {}) => (
          {
            value: (<span className={styles.overflowHidden} onClick={() => {
              window.open(record.txidUrl)
            }} >{record.txid}</span >),
            className: 'blue'
          }
        )
      },
      {
        title: '状态',
        dataIndex: 'status',
        width: 30,
        render: (value) => {
          let cl
          switch (value) {
            case '进行中':
              cl = 'blue'
              break
            case '已拒绝':
              cl = 'red'
              break
          }
          return {
            value,
            className: cl
          }
        }
      },
    ]
    const dataSource = [{}, {}]
    const tableProp = {
      loading: loading.effects[`${modelName}/getAssetRecord`],
      className: styles.tableContainer,
      columns,
      dataSource: dataSource,
    }
    return (
      <Mixin.Child that={this} >
        <div className={styles.Buy} >
          <div className={styles.title} >买入数字货币</div >
          <div className={styles.moneytype} >
            币种
            <div className={styles.select} >
              <MoneySelect
                onChange={(option = {}) => {
                  this.changeMoney(option.value)
                  changeState({
                    addressMsg: '',
                    address: '',
                    amountMsg: '',
                    amount: '',
                  })
                }}
                value={selectItem}
                options={selectList}
              />
            </div >
          </div >
          <ul className={styles.userinput} >
            <li >
              <div className={styles.label} >汇率</div >
              <div >
                1{active} ≈ {selectOne.exchangeRate} 人民币
              </div >
            </li >
            <li >
              <div className={styles.label} >实名认证</div >
              <div >
                {selectOne.realName}
              </div >
            </li >
            <li >
              <div className={styles.label} >我要买</div >
              <div className={styles.input} >
                <Input
                  placeholder={''}
                  value={rmbAmount}
                  onChange={(value) => {
                    changeState({ rmbAmount: value })
                  }} >
                </Input >
              </div >
            </li >
            <li className={styles.inputbutton} >
              <div className={styles.label} ></div >
              <div className={
                classNames(
                  styles.button,
                  true ? styles.permit : null
                )
              } >
                <Button
                  loading={loading.effects[`${modelName}/buyOTC`]}
                  onClick={() => {
                    buyOTC()
                  }} >
                  去支付
                </Button >
              </div >
            </li >
          </ul >
          <div >
            <div >最近10条资金记录</div >
            <div >完整资金记录</div >
          </div >
          <div ><Table {...tableProp} /></div >
        </div >
      </Mixin.Child >
    )
  }
}




