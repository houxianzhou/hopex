import React from 'react'
import { Responsive, _, classNames } from '@utils'
import { BREACKPOINT } from '@constants'

const { MOBILE } = BREACKPOINT

export default function (Props) {
  const { minW, maxW, children, cN = {}, style, notMatch, comp: Comp = 'div', options = {} } = Props
  const result = {
    ...{
      minWidth: MOBILE,
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
            return <Comp className={
              classNames(
                {
                  'pc': true,
                },
                cN
              )
            } style={style} >{children}</Comp >
          } else {
            return _.isUndefined(notMatch) ? (
              <Comp className={
                classNames(
                  {
                    'mobile': true,
                  }
                )
              } >{children}</Comp >
            ) : <>{notMatch}</>
          }
        }}
      </Responsive >
    </div >
  )
}
