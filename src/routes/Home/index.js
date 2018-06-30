import React, { Component } from 'react'
import { connect } from 'dva'
import { message } from 'antd'
import styles from './index.less'

@connect(({ home: model, user, loading, dispatch }) => ({
  user,
  model
}))
export default class View extends Component {
  componentDidMount() {
    message.info('This is a normal message');
  }

  render() {
    const { model: { name } } = this.props
    console.log(this.props)

    return (
      <div>
        <ul>
          <li>1</li>
          <li>2</li>
        </ul>
        <a>ddd</a>
        <h1>{name}</h1>
      </div>
    )
  }
}

