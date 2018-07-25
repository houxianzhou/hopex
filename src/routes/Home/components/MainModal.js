import { Modal } from "@components"
import { classNames } from '@utils'
import close from '@assets/close.png'
import * as styles from './MainModal.less'

export default function (Props) {
  const { children, title, dispatch, modelName, className } = Props
  return (
    <Modal >
      <div className={
        classNames(
          styles.mainmodal,
          className
        )
      } >
        <div className='header' >
          {title}
          <div
            className='close'
            onClick={() => {
              dispatch({
                type: `${modelName}/closeModal`
              })
            }}
          >
            <img alt='close' src={close} />
          </div >
        </div >
        <div className='content' >
          {children}
        </div >
      </div >
    </Modal >
  )
}
