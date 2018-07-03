import React from 'react'
import { Responsive, _, classNames } from '@utils'
import { BREACKPOINT } from '@constants'

const { MOBILE } = BREACKPOINT

export default function (Props) {
  const { minW, maxW, children, cN = {}, common_cN = {}, style, notMatch, comp: Comp = 'div', ...rest } = Props
  const result = {
    ...{
      minWidth: MOBILE,
      maxWidth: null
    },
    ...(minW ? { minWidth: _.isBoolean(minW) ? MOBILE : minW } : {}),
    ...(maxW ? { maxWidth: _.isBoolean(maxW) ? MOBILE : maxW } : {}),
    ...rest
  }
  return (
    <Responsive {...result} >
      {(matches) => {
        if (matches) {
          return <Comp className={
            classNames(
              {
                'pc': true,
              },
              cN,
              common_cN
            )
          } style={style} >{children}</Comp >
        } else {
          return _.isUndefined(notMatch) ? (
            <Comp className={
              classNames(
                {
                  'mobile': true,
                },
                common_cN
              )
            } >{children}</Comp >
          ) : <>{notMatch}</>
        }
      }}
    </Responsive >
  )
}
