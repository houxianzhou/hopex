import React from 'react'
import ReactDOM from 'react-dom'
import { ToastContainer, toast } from 'react-toastify'
import { _, classNames } from '@utils'
import 'react-toastify/dist/ReactToastify.css'
import * as styles from './index.less'


class Toast {
  constructor() {
    this.interval = null
    this.renderElement(_.uniqueId('message'), <ToastContainer />)
  }

  renderElement = (id, element) => {
    clearTimeout(this.interval)
    const target = document.getElementById(id)
    if (!target) {
      const toast = document.createElement('div')
      toast.setAttribute("id", id)
      document.body.appendChild(toast)
      ReactDOM.render(element, toast)
      return toast
    } else {
      target.parentNode.removeChild(target)
      return this.renderElement(id, element)
    }
  }


  tip = (content = '服务错误提示', interval = 2000) => {
    const toast = this.renderElement('tip', (
      <div className={styles.toast_tip} >
        <div className={styles.content} >{content}</div >
      </div >
    ))
    this.interval = setTimeout(() => {
      toast.parentNode.removeChild(toast)
    }, interval)
  }

  message = (status = 'success', title = 'title', message) => {
    toast(
      (
        <div className={styles.toast_message} >
          <div className={
            classNames(
              styles.title,
              status === 'success' ? styles.success : null,
              status === 'warn' ? styles.warn : null
            )
          } >
            <div />
            委托成功
          </div >
          {
            message ? <div className={styles.desc} >{message}</div > : null
          }
        </div >
      ), {
        hideProgressBar: true,
        autoClose: 2000,
        bodyClassName: styles.toast_message_body,
        className: styles.toast_message_content,
      }
    )
  }

  success = (title, message) => {
    this.message('success', title, message)
  }

  warn = (title, message) => {
    this.message('warn', title, message)
  }
}


export default new Toast()
