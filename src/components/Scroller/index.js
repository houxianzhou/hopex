import React, { Component } from 'react'
import BScroll from 'better-scroll'
import { _ } from '@utils'

export default class View extends Component {
  componentDidMount() {
    this.getScroll()
  }

  getScroll = () => {
    const { mouseWheel = true, scrollbar = true, probeType = 0, getScroller, ...rest } = this.props
    this.scroll = new BScroll(`.${this.uuid}`, {
      // tap: true,
      click: true,
      probeType,
      scrollbar: scrollbar === 'fixed' ? {
        fade: false,
        interactive: true
      } : (scrollbar || false),
      scrollY: true,
      mouseWheel,
      ...rest,
    })
    if (getScroller) {
      getScroller(this.scroll)
    }
  }

  render() {
    this.uuid = _.uniqueId('container_')
    const { children, style = {} } = this.props
    return (
      <div style={{ ...{ position: 'relative', width: '100%', height: '100%' }, ...style }} >
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

