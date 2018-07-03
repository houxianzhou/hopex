import Scroller from '@components/Scroller'
import * as styles from './ScrollPanel.less'

export default function (Props) {
  const { header, theader, children, style } = Props
  return (
    <div className={styles.outlines} >
      {
        header ? (<div className={styles.header} style={{ height: 40 }} >{header}</div >) : null
      }
      {
        theader ? (<div className={styles.theader} style={{ height: 32 }} >{theader}</div >) : null
      }
      <Scroller scrollbar='fixed' style={style} >
        {children}
      </Scroller >
    </div >
  )
}
