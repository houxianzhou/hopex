import { Modal } from "@components"
import { classNames } from '@utils'
import arrow_down from '@assets/arrow_down.png'
import * as styles from './MainModal.less'

export default function (Props) {
  const { children, title, dispatch, modelName, className } = Props
  return (
    <Modal >
      <div className={
        classNames(
          className,
          styles.mainmodal
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
          >×
          </div >
        </div >
        <div className='content' >
          {children}
        </div >
      </div >
    </Modal >
  )
}
