import React, { Component } from 'react'
import { classNames } from '@utils'
import { connect } from 'dva'
import { Mixin, Select, Table } from '@components'
import MoneySelect from '@routes/Asset/components/MoneySelect'
import { pulldownpng, triangle2 } from '@assets'
import * as styles from '@routes/Question/index.less'

const list = [
  {
    title: '名称',
    content: '',
    type: 'name'
  },
  {
    title: '符号',
    content: '',
    type: 'code'
  },
  {
    title: '合约类型',
    content: '',
    type: 'type'
  },
  {
    title: '盈亏结算货币',
    content: '',
    type: 'marketPrice'
  },
  {
    title: '价格',
    content: '',
    type: 'price'
  },
  {
    title: '现货价格',
    content: '',
    type: 'marketPrice'
  },
  {
    title: '合约价值(张)',
    content: '',
    type: 'value'
  },
  {
    title: '最小变动价位',
    content: '',
    type: 'minPriceMovement'
  },
  {
    title: '最小交易数量(张)',
    content: '',
    type: 'minTradeNum'
  },
  {
    title: '起始保证金&杠杆',
    content: '',
    type: 'leverage'
  },
  {
    title: '维持保证金率',
    content: '',
    type: 'maintenanceMarginRate'
  },
  {
    title: '委托占用保证金',
    content: '',
    type: ''
  },
  {
    title: '仓位价值',
    content: '数量(张) * 合约价值(张) / 价格',
    type: ''
  },
  {
    title: '持仓占用保证金',
    content: '数量(张) * 合约价值(张) / 开仓均价 * 起始保证金率',
    type: ''
  },
  {
    title: '维持保证金',
    content: '数量(张) * 合约价值(张) / 开仓均价 * 维持保证金率',
    type: ''
  },
  {
    title: '浮动盈亏',
    content: '',
    type: ''
  },
  {
    title: '平仓盈亏',
    content: '',
    type: ''
  },
  {
    title: '强平条件',
    content: '持仓占用保证金 + 浮动盈亏 <= 维持保证金',
    type: ''
  },
  {
    title: '流动性提供方(挂单)手续费率',
    content: '',
    type: 'makerRate'
  },
  {
    title: '流动性提取方(吃单)手续费率',
    content: '',
    type: 'takerRate'
  },
  {
    title: '强平手续费率',
    content: '',
    type: 'closeAllRate'
  },
  {
    title: '未平仓合约数量(张)',
    content: '',
    type: 'positionCnt'
  },
  {
    title: '未平仓合约价值',
    content: '',
    type: 'positionVal'
  },
  {
    title: '24小时交易数量(张)',
    content: '',
    type: 'sum24hDealCnt'
  },
  {
    title: '24小时交易额',
    content: '',
    type: 'sum24hDealAmount'
  },
  {
    title: '总交易数量(张)',
    content: '',
    type: 'sumDealsCnt'
  }
]

@connect(({ Loading, dispatch, question }) => ({
  dispatch,
  model: question,
  modelName: 'question',
  loading: Loading
}))
export default class View extends Component {
  state = {
    choiceList: [],
    activeChoiceCode: '',
    explainList: list
  }

  componentDidMount() {
    this.startInit()
  }

  startInit = () => {
    this.props.dispatch({
      type: `${this.props.modelName}/getContractList`
    }).then((res={}) => {
      console .log(res)
      const {data: choiceList = []} = res;
      this.getContraciDetail({
        contractCode: choiceList.length > 0 ? choiceList[0].code : ''
      });
      this.changeState({
        choiceList: choiceList.map(v => {
          return {
            ...v,
            label: v.name,
            value: v.code
          }
        }),
        activeChoiceCode: choiceList[0].code
      })
    })

  };

  getContraciDetail = ({contractCode = ''}) => {
    this.props.dispatch({
      type: `${this.props.modelName}/getContractDetail`,
      payload: {
        contractCode
      }
    }).then(res => {
      // console.log(res);
      const explainList =  this.state.explainList.map(v => {
        if (v.type !== '') {
          return {
            ...v,
            content: res.data[v.type]
          }
        }
        return v;
      });
      // console.log(explainList)
      this.changeState({
        activeChoiceCode: contractCode,
        explainList
      })
    });
  };

  changeState = (payload = {}) => {
    this.setState(payload)
  };


  render() {
    const { changeState, getContraciDetail } = this;
    const { model: { myName }, calculateTableHeight, dispatch, modelName, loading, history } = this.props;
    const { choiceList, activeChoiceCode, explainList } = this.state;
    const columns = [
      {
        // title: '时间',
        dataIndex: 'title'
      },
      {
        // title: 'IP地址',
        dataIndex: 'content'
      },
    ];
    const tableProps = {
      columns,
      dataSource: explainList,
      style: {
        table: {
          height: 200
        },
        td: {
          width: '30%'
        }
      },
      // classNames: styles.loginrecord,
      scroll: {},
    }

    return (
      <Mixin.Child that={this} >
        <div className={classNames(
          styles.container,
          styles.contractExplain
        )} >
          <div className={styles.questionTitle} >
            合约指南
          </div >
          <div className={styles.selectContainer} >
            <MoneySelect
              onChange={(option = {}) => {
                getContraciDetail({ contractCode: option.code })
              }}
              value={choiceList.find(v => v.code === activeChoiceCode)}
              options={choiceList}
              styles={{
                container: {
                  width: 150,
                  // background: 'red',
                },
                dropdownIndicator: {
                  width: 8,
                  display: 'flex',
                  alignItems: 'center'
                },
                menu: {
                  right: 0,
                  // background: 'red',
                  color: 'black',
                  width: 150,
                  top: 20,
                },
                menuList: {
                  width: 200
                },
              }}
            />
          </div >
          <div style={{ height: calculateTableHeight(list, 40, 40) }} className={styles.tablec}>
            <Table style={{color: 'white'}} {...tableProps} />
          </div >
          <p className={styles.contractFooter}>
            相关用例参考
            <span
              className={styles.routerGo}
              onClick={() => {
                if (history && history.replace) {
                  history.replace('?page=ReverseContractCalculate')
                }
                // this.changePage(item.onClick, item.name)
              }}
            >反向合约相关实例</span>
          </p>
        </div >
      </Mixin.Child >
    )
  }
}


