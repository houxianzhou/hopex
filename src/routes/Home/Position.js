import React, { Component } from 'react'
import { classNames, dealInterval, _, formatNumber, getPercent } from '@utils'
import { Table, Mixin } from '@components'
import { SCROLLX, TABLE } from '@constants'
import add from '@assets/add.png'
import substract from '@assets/substract.png'
import ScrollPannel from './components/ScrollPanel'
import RedGreenSwitch from './components/RedGreenSwitch'
import MainModal from './components/MainModal'
import styles from './index.less'


export default class View extends Component {
  state = {
    active: 0
  }
  startInit = () => {
    this.getPosition()
  }

  getPosition = () => {
    const { dispatch, modelName } = this.props
    dispatch({
      type: `${modelName}/getPosition`
    }).then(() => {
      this.interval = dealInterval(() => {
        this.getPosition()
      })
    })
  }

  changeState = (payload) => {
    this.setState(payload)
  }

  render() {
    const { changeState } = this
    const { model: { positionList = [], dealMoney }, modal: { name }, noDataTip, modelName, dispatch } = this.props

    const openModal = () => {
      dispatch({
        type: `${modelName}/openModal`,
        payload: {
          name: 'positionMoney'
        }
      })
    }
    const columns = [
      {
        title: '合约',
        dataIndex: 'market',
        render: (value) => ({
          value,
          className: 'blue'
        })
      },
      {
        title: '当前价格',
        dataIndex: 'lastPrice',
        // render: (v) => formatNumber(v, 'p')
      },
      {
        title: '当前合理价格',
        dataIndex: 'averagePrice',
        // render: (v) => formatNumber(v, 'p')
      },
      {
        title: '杠杆倍数',
        dataIndex: 'leverage',
      },
      {
        title: '数量(张)',
        dataIndex: 'amount',
        render: (value) => Number(value) >= 0 ? (
          <RedGreenSwitch.GreenText value={value} />
        ) : (<RedGreenSwitch.RedText value={value} />)
      },
      {
        title: '开仓均价',
        dataIndex: 'averagePrice',
        // render: (v) => formatNumber(v, 'p')
      },
      {
        title: '持仓占用保证金',
        dataIndex: 'positionMoney',
        render: (v) => {
          return (
            <div className={styles.changepositionMoney} >
              <div onClick={() => {
                changeState({
                  active: 0
                })
                openModal()
              }} >
                <img src={substract} />
              </div >
              <div className={styles.positionMoney} >{v}</div >
              <div onClick={() => {
                changeState({
                  active: 1
                })
                openModal()
              }} >
                <img src={add} />
              </div >
            </div >
          )
        }
      },
      {
        title: '维持保证金',
        dataIndex: 'keepMoney',
        // render: (v) => formatNumber(v, 'p')
      },
      {
        title: '强平价格',
        dataIndex: 'overPrice',
        // render: (v) => formatNumber(v, 'p')
      },
      {
        title: '浮动盈亏(收益率)',
        dataIndex: 'floatProfit',
        render: (v, record = {}) => {
          const value = `${record.floatProfit}(${record.profitRate})`
          return Number(v) >= 0 ? (
            <RedGreenSwitch.GreenText value={value} />
          ) : (
            <RedGreenSwitch.RedText value={value} />
          )
        }
      },
      {
        title: '操作',
        width: 250,
        dataIndex: 'work',
      },

    ]
    const dataSource = positionList
    const tableProp = {
      className: styles.tableContainer,
      columns,
      dataSource: dataSource, //_.merge((new Array(4)).fill(), dataSource),
      scroll: {
        x: SCROLLX.X
      },
      noDataTip: () => noDataTip(dataSource, '当前无持仓'),
    }
    return (
      <Mixin.Child that={this} >
        <div
          className={
            classNames(
              {
                view: true
              },
              styles.position
            )
          }
        >
          <ScrollPannel
            tableHeight={TABLE.trHeight * (dataSource.length + 1)}
            header={
              <div >当前持仓</div >
            }
          >
            <Table {...tableProp}  />
          </ScrollPannel >
        </div >
        {
          name === 'positionMoney' ? (<RenderModal {...this.props} {...this.state} changeState={changeState} />) : null
        }
      </Mixin.Child >
    )
  }
}

class RenderModal extends Component {
  render() {
    const props = {
      ...this.props,
      title: '持仓占用保证金'
    }
    const { changeState, active, dispatch, modelName } = this.props
    return (
      <MainModal {...props} className={styles.position_modal} >
        <div className={styles.header} >
          <ul >
            <li >
              <div
                className={classNames(
                  active === 0 ? styles.active : null
                )}
                onClick={() => {
                  changeState({
                    active: 0
                  })
                }} >
                增加保证金
              </div >
            </li >
            <li >
              <div
                className={classNames(
                  active === 1 ? styles.active : null
                )}
                onClick={() => {
                  changeState({
                    active: 1
                  })
                }} >
                减少保证金
              </div >
            </li >
          </ul >
        </div >
        <div className={styles.content} >
          <div className={styles.input} >
            <div className={styles.edit} >
              ahhaha
              <input />
              <div >BTC</div >
            </div >
          </div >
          <ul className={styles.desc} >
            <li >最多增加
              <div >1347.8912BTC</div >
            </li >
            <li >追加后的强平价格为 ：
              <div >1347.8912BTC</div >
            </li >
          </ul >
        </div >
        <div className={styles.buttons} >
          <div
            onClick={() => {
              dispatch({
                type: `${modelName}/closeModal`,
              })
            }}
          >
            取消
          </div >
          <div
            className={styles.confirm}
            onClick={() => {

            }}
          >
            确定
          </div >
        </div >
      </MainModal >
    )
  }
}

