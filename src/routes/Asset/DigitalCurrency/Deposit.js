import React, { Component } from 'react'
import { connect } from 'dva'
import ClipboardJS from 'clipboard'
import { Mixin, } from '@components'
import MoneySelect from '@routes/Asset/components/MoneySelect'

import styles from '@routes/Asset/index.less'

@connect(({ modal, Loading, asset }) => ({
  modal,
  model: asset,
  loading: Loading
}))
export default class View extends Component {
  constructor(props) {
    super(props)
    const { model: { detailDigital } } = this.props
    this.state = {
      active: detailDigital[0].assetName,
    }
  }

  componentDidMount() {
    this.startInit()
  }

  startInit = () => {
    new ClipboardJS('.clipboard')
    this.getAssetAddress()
  }


  changeMoney = (payload) => {
    this.changeState({ active: payload },
      () => {
        this.getAssetAddress()
      }
    )
  }

  getAssetAddress = () => {
    const { dispatch, modelName } = this.props
    const { active } = this.state

    if (active) {
      dispatch({
        type: `${modelName}/getAssetAddress`,
        payload: {
          asset: active
        }
      })
    }
  }


  render() {
    const { model: { detailDigital = [] } } = this.props
    const { active } = this.state
    const selectList = detailDigital.map((item = {}) => ({ label: item.assetName, value: item.assetName }))
    const selectItem = selectList.filter((item = {}) => item.label === active)[0]
    const selectOne = detailDigital.filter((item = {}) => item.assetName === active)[0]
    return (
      <Mixin.Child that={this} >
        <div className={styles.deposit} >
          <div className={styles.title} >存款</div >
          <div className={styles.moneytype} >
            币种
            <div className={styles.select} >
              <MoneySelect
                onChange={(option = {}) => {
                  this.changeMoney(option.value)
                }}
                value={selectItem}
                options={selectList}
              />
            </div >
          </div >
          <div className={styles.address} >你的个人多重签名{selectOne.assetName}存款地址</div >
          {
            selectOne.address ? (<div className={styles.letter} >
              <span id='address' >{selectOne.address}</span >
              <div className="clipboard" data-clipboard-target="#address" style={{ cursor: 'pointer' }} >复制</div >
            </div >) : null
          }
          {
            selectOne.qrCodeImgUrl ? (
              <div className={styles.img} >
                <img src={selectOne.qrCodeImgUrl} />
              </div >
            ) : null
          }


          <div className={styles.desc} >
            <div >重要提示</div >
            <ul >
              {
                (selectOne.prompts || []).map((item = '', index) => {
                  return <li key={index} >{item}</li >
                })
              }
            </ul >

          </div >
        </div >
      </Mixin.Child >
    )
  }
}


