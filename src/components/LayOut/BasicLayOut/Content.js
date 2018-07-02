import * as styles from './index.less'


export default function (Props) {
  const { children } = Props
  return (
    <div className={styles.content} >
      {children}
    </div >
  )
}
