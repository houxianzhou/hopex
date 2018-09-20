import React, { Component } from 'react'
import { classNames, dealInterval, _, formatNumber, Patterns } from '@utils'
import { Table, Mixin, Button, Toast, ToolTip, } from '@components'
import { SCROLLX, TABLE, } from '@constants'
import add from '@assets/add.png'
import substract from '@assets/substract.png'
import { editIcon } from '@assets'
import MainModal from '@routes/Components/MainModal'
import RedGreenSwitch from '@routes/Components/RedGreenSwitch'
import ScrollPannel from './components/ScrollPanel'
import styles from './index.less'


export default class Position extends Component {
  state = {
    active: 0
  }

  startInit = () => {
    this.getPosition()
  }

  getPosition = () => {
    const { dispatch, modelName } = this.props
    dispatch({
      type: `${modelName}/getPosition`,
    }).then(() => {
      if (!this._isMounted || this.interval) return
      this.interval = dealInterval(() => {
        this.interval = null
        this.getPosition()
      })
    })
  }

  postOrder = (payload) => {
    const { dispatch, modelName } = this.props
    dispatch({
      type: `${modelName}/doFullClose`,
      payload: payload
    }).then(() => {
      this.getPosition()
    })
  }


  render() {
    const { changeState, postOrder, } = this
    const { model: { positionList = [], }, modal: { name, data }, noDataTip, modelName, dispatch, openModal: prevOpenModal, switchMarket } = this.props

    const openModal = (payload) => {
      prevOpenModal({
        name: 'positionMoney',
        data: payload
      })
    }

    const columns = [
      {
        title: '合约',
        dataIndex: 'marketName',
        render: (value, record = {}) => ({
          value: switchMarket(value, record.market),
          className: 'blue'
        })
      },
      {
        title: '当前价格',
        dataIndex: 'lastPriceShow',
        // render: (v) => formatNumber(v, 'p')
      },
      {
        title: '当前合理价格',
        dataIndex: 'reasonablePriceShow',
        // render: (v) => formatNumber(v, 'p')
      },
      {
        title: '杠杆倍数',
        dataIndex: 'leverage',
      },
      {
        title: '数量(张)',
        dataIndex: 'amount',
        render: (value) => <RedGreenSwitch.MarkText mark={value} value={value.replace(/['+']/, '')} />
      },
      {
        title: '开仓均价',
        dataIndex: 'averagePriceShow',
        // render: (v) => formatNumber(v, 'p')
      },
      {
        title: '持仓占用保证金',
        dataIndex: 'positionMoneyShow',
        width: 200,
        render: (v, record) => {
          return (
            <div className={styles.changepositionMoney} >
              <div onClick={() => {
                openModal(record.market)
                changeState({
                  active: 1
                })

              }} >
                <img src={substract} />
              </div >
              <div className={styles.positionMoney} >{v}</div >
              <div onClick={() => {
                openModal(record.market)
                changeState({
                  active: 0
                })
              }} >
                <img src={add} />
              </div >
            </div >
          )
        }
      },
      {
        title: '维持保证金',
        width: 200,
        dataIndex: 'keepMoneyShow',
        //render: (v) => formatNumber(v, 10)
      },
      {
        title: '强平价格',
        dataIndex: 'overPriceShow',
        // render: (v) => formatNumber(v, 10)
      },
      {
        title: '浮动盈亏(收益率)',
        dataIndex: 'floatProfitShow',
        width: 200,
        render: (value, record = {}) => {
          const v = record.profitRate
          const format = <RedGreenSwitch.MarkText mark={v} value={v.replace(/['+']/, '')} />
          return (
            <>
              <RedGreenSwitch.MarkText mark={value} value={value.replace(/['+']/, '')} />

              <span style={{ marginLeft: 5 }} >({format})</span >
            </>
          )
        }
      },
      {
        title: '操作',
        width: 280,
        dataIndex: 'overPriceShow',
        render: (value, record = {}, index) => {
          return {
            value: (
              <div className={classNames(
                // record.allowFullClose ? null : styles.gray
              )} >
                <input className={styles.input} value={record.inputValue || ''} onChange={(e) => {
                  if (Patterns.decimalNumber.test(e.target.value) || e.target.value === '') {
                    dispatch({
                      type: `${modelName}/doInputChangePosition`,
                      payload: {
                        market: record.market,
                        value: e.target.value
                      }
                    })
                  }
                }} />
                <span onClick={() => {
                  if (!record.inputValue) return Toast.tip('请填写价格')
                  postOrder({
                    price: record.inputValue,
                    market: record.market,
                  })
                }} >
                  <Button layer={false} loading={false} loadingMargin='0 0 0 2px' >
                    限价全平
                  </Button >
                </span >
                <span onClick={() => {
                  postOrder({
                    price: undefined,
                    market: record.market,
                  })
                }} >
                  <ToolTip >市价全平</ToolTip >
                </span >
              </div >
            ),
            className: 'blue action'
          }
        }
      },
    ]
    const dataSource = positionList
    const tableProp = {
      className: styles.tableContainer,
      columns,
      dataSource: dataSource, //_.merge((new Array(4)).fill(), dataSource),
      scroll: {
        x: SCROLLX.X,
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
          name === 'positionMoney' ? (
            <RenderModal {...this} {...this.props} {...this.state} changeState={changeState} data={data} />) : null
        }
      </Mixin.Child >
    )
  }
}

class RenderModal extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.calculatePositionEnsureMoney()
  }

  calculatePositionEnsureMoney = (value) => {
    const { dispatch, modelName, data } = this.props
    dispatch({
      type: `${modelName}/calculatePositionEnsureMoney`,
      payload: {
        marginChange: value,
        market: data
      }
    }).then((res) => {
      if (res) {
        const { dealcurrency: dealCurrency = '', increase = {}, reduce = {} } = res || {}
        this.changeState({
          dealCurrency,
          increase,
          reduce
        })
      }
    })
  }


  state = {
    inputValue: '',
    dealCurrency: '',
    increase: {},
    reduce: {}
  }

  changeState = (payload) => {
    this.setState(payload)
  }

  render() {
    const props = {
      ...this.props,
      title: '持仓占用保证金'
    }
    const { changeState: changeStateInModal, calculatePositionEnsureMoney } = this
    const { inputValue, dealCurrency = '', increase = {}, reduce = {} } = this.state
    const { changeState, active, dispatch, modelName, loading, closeModal, getPosition, data } = this.props


    const currentObj = active === 0 ? increase : reduce
    const { maxChange = '', liquidationPrice: overPrice = '' } = currentObj || {}
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
              {editIcon}
              <input autoFocus value={inputValue} onChange={
                (e) => {
                  const value = _.get(e, 'target.value')
                  if (Patterns.decimalNumber4.test(value) || value === '') {
                    changeStateInModal({
                      inputValue: value.replace(/。/, '')
                    })
                    calculatePositionEnsureMoney(value)
                  }
                }
              } />
              <div >{dealCurrency}</div >
            </div >
          </div >
          <ul className={styles.desc} >
            <li >
              最多{active === 0 ? '增加' : '减少'} :
              <div >{`${maxChange}`}</div >
            </li >
            <li >追加后的强平价格为 :
              <div >{`${overPrice}`}</div >
            </li >
          </ul >
        </div >
        <div className={styles.buttons} >
          <div
            onClick={() => {
              closeModal()
            }}
          >
            取消
          </div >
          <div
            className={styles.confirm}
            onClick={() => {
              if (!Math.abs(inputValue)) return
              dispatch({
                type: `${modelName}/doUpdatePositionEnsureMoney`,
                payload: {
                  market: data,
                  assetName: dealCurrency,
                  assetChange: active === 1 ? `-${inputValue}` : inputValue
                }
              }).then((res) => {
                getPosition()
                if (res) {
                  closeModal()
                }
              })
            }}
          >
            <Button layer={false} loading={loading.effects[`${modelName}/doUpdatePositionEnsureMoney`]} >
              确定
            </Button >

          </div >
        </div >
      </MainModal >
    )
  }
}

