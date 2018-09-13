import React, { Component } from 'react'
import { Button, Table, Loading, RouterGo } from '@components'
import { _, classNames } from '@utils'


export const getColumns = (props = {}) => {
  const { dispatch, modelName, columns = [] } = props
  const cols = [
    {
      title: '时间',
      dataIndex: 'time',
      render: (value, record) => (
        value
      )
    },
    {
      title: '类型',
      dataIndex: 'orderTypeDisplay',
      render: (value) => value
    },
    {
      title: '数字货币金额',
      dataIndex: 'amount',
    },
    {
      title: '法币金额',
      dataIndex: 'rmbAmount',
      render: (value, record = {}) => value
    },
    {
      title: '状态',
      dataIndex: 'orderStatusDisplay',
      render: (v) => {
        return v
        let result
        let color
        switch (v) {
          case 'Processing':
            break
          case 'Success':
            color = "red"
            break
          case '2':
            result = '完全成交'
            break
          case '3':
            result = '已撤销'
        }
        return {
          value: result,
          classNames: 'red'
        }
      }
    },
  ]
  columns.map((item = {}) => {
    const filterOne = _.findIndex(cols, (one = {}) => String(one.title) === String(item.title))
    if (filterOne !== -1) {
      cols.splice(filterOne, 1, {
        ...cols[filterOne],
        ...item
      })
    } else {
      cols.push(item)
    }
  })
  return cols
}

