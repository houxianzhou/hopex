import React, { Component } from 'react'
import BScroll from 'better-scroll'
import { _ } from '@utils'

export default class View extends Component {
  componentDidMount() {
    this.startInit()
  }

  startInit = () => {
    const {
      mouseWheel = true, // 是否监听滚轮滚动，此属性影响着鼠标滚动时，最外层的scroll滚动条能否滚动
      scrollbar = true, // 滚动条显示样式，是一直显示还是滚动时显示
      getScroller,
      ...rest
    } = this.props
    this.scroll = new BScroll(`.${this.uuid}`, {
      click: true,
      probeType: 0,
      preventDefault: mouseWheel,
      stopPropagation: false,
      scrollbar: scrollbar === 'fixed' ? {
        fade: false,
        interactive: true
      } : (scrollbar || false),
      scrollY: !!scrollbar || false,
      mouseWheel,
      ...rest
    })
    if (getScroller) {
      getScroller(this.scroll)
    }
  }

  render() {
    this.uuid = _.uniqueId('container_')
    const { children } = this.props
    return (
      <div
        style={{ position: 'relative', width: '100%', height: '100%' }} >
        <div
          className={`${this.uuid}`}
          style={{
            height: '100%',
            width: '100%',
            overflow: 'hidden',
            position: 'absolute',
            top: '0'
          }}
        >
          <div className="content" >
            {children}
          </div >
        </div >
      </div >
    )
  }
}

