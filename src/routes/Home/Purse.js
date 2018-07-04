import React, { Component } from 'react'
import { classNames } from '@utils'
import ScrollPannel from './components/ScrollPanel'


export default class View extends Component {
  render() {
    return (
      <div
        style={{
          'flexGrow': 1,
          height: 344,
        }}
        className={
          classNames(
            {
              view: true
            }
          )
        }
      >
        <ScrollPannel >
          ahhaha
        </ScrollPannel >
      </div >
    )
  }
}

