import { classNames } from '@utils'
import * as styles from './InputNumber.less'

export default function (Props) {
  const {
    value, className = {}, style = {}
  } = Props
  return (
    <div
      style={style}
      className={classNames(
        styles.input_number,
        className
      )} >
      <div >-</div >
      <input value={value} />
      <div >+</div >
    </div >
  )
}
