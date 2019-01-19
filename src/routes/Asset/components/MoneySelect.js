import React, { Component } from 'react'
import { Select } from '@components'
import { triangle2 } from '@assets'
import { COLORS } from "@constants"

export default class MoneySelect extends Component {
  render() {
    const { value, options, onChange, styles = {} } = this.props
    return (
      <Select
        value={value}
        onChange={onChange}
        options={options}
        placeholder={''}
        getOptionLabel={(option) => option.label}
        getOptionValue={(option) => option.value}
        DropdownIndicator={(
          <div style={{ display: 'flex', alignItems: 'center' }} >
            {triangle2}
          </div >
        )}
        styles={{
          container: {
            width: 58,
            // background: 'red',
          },
          dropdownIndicator: {
            width: 8,
            display: 'flex',
            alignItems: 'center'
          },
          menu: {
            right: -5,
            background: 'red',
            width: 115,
            top: 20,
          },
          menuList: {
            width: 200
          },
          // multiValue: {
          //   background: 'red'
          // },
          // multiValueLabel:{
          //   background: 'red'
          // },
          // singleValue:{
          //   background: 'blue'
          // },
          // multiValueRemove:{
          //   background: 'blue'
          // },
          valueContainer:{
            // background: 'red'
          },
          option: {
            textAlign: 'center',
            borderBottom: '1px solid #EBEBEB',
            selected: {
              color: COLORS.yellow ,
            },
            focused: {
              color: COLORS.yellow,
            }
          },
          ...styles
        }}
      />
    )
  }

}
