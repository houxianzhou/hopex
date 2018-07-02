import Scroller from '@components/Scroller'
import * as styles from './ScrollPanel.less'

export default function (Props) {
  const { header, children } = Props
  return (
    <div className={styles.outlines} >
      {
        header ? (<div >头部</div >) : null
      }
      <Scroller scrollbar='fixed' >
        {children}
      </Scroller >
    </div >
  )
}
