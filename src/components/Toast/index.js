import React from 'react'
import ReactDOM from 'react-dom'
import { ToastContainer, toast } from 'react-toastify'
import { _ } from '@utils'
import 'react-toastify/dist/ReactToastify.css'
import * as styles from './index.less'


class Toast {
  constructor() {
    this.interval = null
    this.renderElement(_.uniqueId('message'), <ToastContainer className='hahahah' />)
  }

  renderElement = (id, element) => {
    const target = document.getElementById(id)
    if (!target) {
      const toast = document.createElement('div')
      toast.setAttribute("id", id)
      document.body.appendChild(toast)
      ReactDOM.render(element, toast)
      return toast
    } else {
      target.parentNode.removeChild(target)
      this.renderElement(id, element)
    }
  }


  tip = () => {
    const toast = this.renderElement('tip', (
      <div style={{ position: 'fixed', top: 100, height: 200, width: 200, background: 'blue' }} >ahhahahahahah</div >
    ))
    clearTimeout(this.interval);
    this.interval = setTimeout(() => {
      toast.parentNode.removeChild(toast)
    }, 2000)
  }

  message = () => {
    toast('hahahahha', {
      autoClose: false,
      className: styles.toast_tip,
    })
  }
}


export default new Toast()
