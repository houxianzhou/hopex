import React from 'react'
import { Responsive, _ } from '@utils'
import { BREACKPOINT } from '@constants'

const { MOBILE } = BREACKPOINT

export default function (Props) {
  const { minW, maxW, children, cN: className, style, notMatch, options = {} } = Props
  const result = {
    ...{
      minWidth: 0,
      maxWidth: null
    },
    ...(minW ? { minWidth: _.isBoolean(minW) ? MOBILE : minW } : {}),
    ...(maxW ? { maxWidth: _.isBoolean(maxW) ? MOBILE : maxW } : {}),
    ...options
  }
  return (
    <div >
      <Responsive {...result} >
        {(matches) => {
          if (matches) {
            return <div className={className} style={style} >{children}</div >
          } else {
            return _.isUndefined(notMatch) ? <>{children}</> : <>{notMatch}</>
          }
        }}
      </Responsive >
    </div >
  )
}
