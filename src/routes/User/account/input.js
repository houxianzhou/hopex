import React, { Component } from 'react'
import { classNames, _ } from '@utils'
// import clearpng from '@assets/clear.png'
import * as styles from './input.less'

export class Input extends Component {
  handleChange = (e) => {
    const value = e.target.value;
    this.props.onChange(value);
    _.isFunction(this.props.onCheck) && this.props.onCheck(value);
  };

  handleCheck = (e) => {
    const value = e.target.value; // ff
    _.isFunction(this.props.onCheck) && this.props.onCheck(value)
  };

  render() {
    const {
      placeholder = '', value = '', type = 'text', msg = '', CountDown = ''
    } = this.props
    return (
      <div className={styles.inputComponent} >
        <input type={type} value={value} onChange={this.handleChange} className={msg && styles.errStatus}
               placeholder={placeholder} />
        {
          CountDown ? CountDown : null
        }
        {
          msg ? (<p className={styles.errDes} >{msg}</p >) : null
        }
      </div >
    )
  }
}

