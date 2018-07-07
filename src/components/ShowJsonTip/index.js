import React, { Component } from 'react'

export default class View extends Component {
  render() {
    const { data = {} } = this.props
    return (
      <div style={{
        width: '40%',
        opacity: .5,
        position: 'fixed',
        top: 0,
        right: 450,
        background: 'white',
        color: 'black',
        margin: 10,
        zIndex: 10000,
      }} >
      <textarea
        value={JSON.stringify(data)}
        onChange={() => {
        }}
        rows={5}
        style={{
          width: '100%'
        }} />
        <div >
          <button onClick={() => {

          }} >其他人卖出
          </button >
        </div >

      </div >

    )
  }

}
