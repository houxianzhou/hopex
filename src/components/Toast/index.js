import React from 'react'
import ReactDOM from 'react-dom'
import { ToastContainer, toast } from 'react-toastify'
import { _ } from '@utils'
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


  tip = (content = 'tip提示',interval=2000) => {
    const toast = this.renderElement('tip', (
      <div className={styles.toast_tip} >
        <div className={styles.content} >{content}</div >
      </div >
    ))
    this.interval = setTimeout(() => {
      toast.parentNode.removeChild(toast)
    }, interval)
  }

  message = (message = 'message提示') => {
    toast((
      <div className={styles.toast_message}>ahhahah</div >
    ), {
      autoClose: false,
      bodyClassName: styles.toast_message_body,
      className: styles.toast_message_content,
    })
  }
}


export default new Toast()
