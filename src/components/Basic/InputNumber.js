import { classNames, Patterns } from '@utils'
import * as styles from './InputNumber.less'

export default function (Props) {
  const {
    value, step = 10, max, min, onChange, className = {}, style = {}
  } = Props
  const valueTrans = value
  return (
    <div
      style={style}
      className={classNames(
        styles.input_number,
        className
      )} >
      <div
        onClick={
          () => {
            let re = Number(valueTrans) - step
            if (re < 0) {
              re = 0
            }
            onChange(re)
          }
        }
      >-
      </div >
      <input value={valueTrans} onChange={(e) => {
        if (Patterns.number.test(e.target.value)) {
          onChange(e.target.value)
        }
      }} />
      <div onClick={
        () => {
          onChange(Number(valueTrans) + step)
        }
      } >+
      </div >
    </div >
  )
}
