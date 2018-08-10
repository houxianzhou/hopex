import { classNames, _ } from '@utils'
import { Loading } from "@components"

export default function (Props) {
  const { children, style = {}, className, onClick, loading = false } = Props
  return (
    <div
      style={style}
      className={className}
      onClick={() => {
        if (_.isFunction(onClick)) {
          onClick()
        }
      }}
    >
      {children}
      {/*<Loading.Circle1 />*/}
    </div >
  )
}
