import React, { Component } from 'react'
import { connect } from 'dva'
import { Mixin, Table, PagiNation } from '@components'
import { classNames } from '@utils'

import * as styles from '@routes/Question/index.less'

@connect(({ Loading, dispatch, question }) => ({
  dispatch,
  model: question,
  modelName: 'question',
  loading: Loading
}))
export default class View extends Component {
  state = {
    list: [
      {
        time: '2018-04-26 20:00:00',
        content: 'BTCUSD0528',
        price: '8888.88'
      },
      {
        time: '2018-04-26 20:00:00',
        content: 'BTCUSD0528',
        price: '8888.88'
      },
      {
        time: '2018-04-26 20:00:00',
        content: 'BTCUSD0528',
        price: '8888.88'
      },
    ],
    currentPage: 0
  }

  componentDidMount() {
    this.startInit()
  }

  startInit = () => {

  }
  changeState = (payload = {}) => {
    this.setState(payload)
  };

  getAssetRecord = () => {
    const { dispatch, modelName } = this.props;
    const { currentPage } = this.state;
    console.log(currentPage + 1)
    // dispatch({
    //   type: `${modelName}/getAssetRecord`,
    //   payload: {
    //     page: currentPage + 1
    //   }
    // })
  }


  render() {
    const { changeState, getAssetRecord } = this;
    const { model: { myName }, calculateTableHeight, dispatch, modelName, loading } = this.props;
    const { list, currentPage } = this.state;
    const columns = [
      {
        title: '时间',
        dataIndex: 'time'
      },
      {
        title: 'BTC保险基金余额',
        dataIndex: 'content'
      },
      {
        title: 'ETH保险基金余额',
        dataIndex: 'price'
      }
    ];
    const pageProp = {
      total: list.length,
      currentPage,
      onPageChange: (e) => {
        changeState({
          currentPage: e
        }, () => {
          getAssetRecord()
        })
      },
      containerClassName: styles.paginationcontainerClassName,
      pageClassName: 'paginationpageClassName',
      activeClassName: 'paginationpageActiveClassName',
      previousClassName: 'paginationpageClassName',
      nextClassName: 'paginationpageClassName',
    }
    const tableProps = {
      columns,
      dataSource: list,
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
          styles.exchangeGuide,
          styles.settlement
        )} >
          <div className={styles.questionTitle} >
            保险基金
          </div >
          <div className={classNames(
            styles.contentDetail,
            styles.borderNone
          )} >
            Hopex使用保险基金来避免投资者的持仓被自动减仓。 该基金用来改进未被执行的强平委托的价格，以避免它们被自动减仓系统接管。<br /><br />

            保险基金额的增长来自强平委托在市场上于优于破产价的价格成交。<br /><br />

            你可以查看下面的保险基金的当前和历史余额。
          </div >
          <div style={{ height: calculateTableHeight(list, 50, 50) }} className={styles.tablec} >
            <Table style={{ color: 'white' }} {...tableProps} />
          </div >
          {/*<PagiNation*/}
            {/*{...pageProp}*/}
          {/*/>*/}
        </div >
      </Mixin.Child >
    )
  }
}


