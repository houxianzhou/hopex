import React, { Component } from 'react'
import { connect } from 'dva'
import { _, classNames } from '@utils'
import { THEME } from '@constants'
import defaultpng from '@assets/default.png'
import defaultwhite from '@assets/defaultwhite.png'
import * as styles from './NoDataTip.less'


@connect(({ theme: model }) => ({
  model,
}))
class NoDataTip extends Component {
  render() {
    const { model: { theme }, text, change = false } = this.props
    return <div className={styles.defaultpngcontainer} >
      <img src={
        !change ? defaultwhite : (theme === THEME.DEEPDARK ? defaultpng : defaultwhite)
      } />
      <div style={{ marginTop: 8 }} className={
        classNames(
          !change ? null : styles.nodatatip
        )
      } >{text}</div >
    </div >
  }
}

export default NoDataTip
