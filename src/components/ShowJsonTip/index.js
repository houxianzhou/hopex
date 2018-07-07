import React, { Component } from 'react'
import Draggable from 'react-draggable';
import { Slider } from 'antd';
import { _, localSave, classNames } from '@utils'
import * as styles from './index.less'

const WIDTH = 500
const HEIGHT = 300
const OPACITY = 0.5
export default class View extends Component {
  state = {
    x: _.get(localSave.get('jsontip'), 'x') || 0,
    y: _.get(localSave.get('jsontip'), 'y') || 0,
    width: _.get(localSave.get('jsontip'), 'width') || WIDTH,
    height: _.get(localSave.get('jsontip'), 'height') || HEIGHT,
    opacity: _.get(localSave.get('jsontip'), 'opacity') || OPACITY,
    activeVar: _.get(localSave.get('jsontip'), 'activeVar') || '所有'
  }

  changeState = (obj = {}) => {
    this.setState(obj, () => {
      localSave.set('jsontip', this.state)
    })
  }

  render() {
    const { data = {} } = this.props
    const { state } = this
    return (
      <Draggable
        position={{
          x: state.x,
          y: state.y
        }}
        onDrag={(pos) => {
          this.changeState({
            x: state.x + pos.movementX,
            y: state.y + pos.movementY
          })
        }}
      >
        <div style={{
          padding: 10,
          width: state.width,
          height: state.height,
          overflow: 'hidden',
          opacity: state.opacity,
          position: 'fixed',
          // top: 0,
          // left: 450,
          background: 'white',
          color: 'black',
          margin: 10,
          zIndex: 10000,
        }} >
          <div className={styles.jsontip} >
            <div style={{
              display: 'flex',
              alignItems: 'center',
            }} >
              <div >宽度，高度，透明度</div >
              <Slider value={state.width} style={{ width: 100, marginLeft: 20 }} min={WIDTH} max={1300}
                      onChange={(value) => {
                        this.changeState({
                          width: Number(value)
                        })
                      }}
              />
              <Slider value={state.height} style={{ width: 100, marginLeft: 20 }} min={50} max={800}
                      onChange={(value) => {
                        this.changeState({
                          height: Number(value)
                        })
                      }}
              />
              <Slider value={state.opacity} style={{ width: 100, marginLeft: 20 }} min={0.1} step={0.1} max={1}
                      onChange={(value) => {
                        this.changeState({
                          opacity: Number(value)
                        })
                      }}
              />
            </div >

            <div className={styles.varname} >
              {
                ['所有'].concat(_.keys(data)).map(item => (
                  <div
                    key={item}
                    className={
                      classNames(
                        styles.key,
                        state.activeVar === item ? styles.active : {}
                      )
                    }
                    onClick={() => {
                      this.changeState({
                        activeVar: item
                      })
                    }}
                  >{item}</div >
                ))
              }

            </div >
          </div >
          <textarea
            value={(
              (state.activeVar !== '所有' ? JSON.stringify({ [state.activeVar]: data[state.activeVar] }) : _.keys(data).reduce((sum, next) => {
                return sum + next + ':' + (_.isObjectLike(data[next]) ? JSON.stringify(data[next]) : data[next]) + '\n'
              }, ''))
            )}
            onChange={() => {
            }}
            // rows={5}
            style={{
              width: '100%',
              height: '80%'
            }} />
          <div >
            {/*<button onClick={() => {*/}

            {/*}} >其他人卖出*/}
            {/*</button >*/}
          </div >
        </div >
      </Draggable >
    )
  }
}
