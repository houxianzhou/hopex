import React, { Component } from 'react'
import Select, { components } from 'react-select'
import { _ } from '@utils'

export default class View extends Component {
  render() {
    const {
      DropdownIndicator, IndicatorSeparator = null, placeholder = 'placeholder',
      getOptionLabel = (option) => option.label, getOptionValue = (option) => option.value,
      options = [], defaultValue = {}, value = {}, onChange, styles = {}, noOptionsMessage = () => '暂无数据'
    } = this.props
    return (
      <Select
        options={options}
        noOptionsMessage={noOptionsMessage}
        components={{
          DropdownIndicator: (props) => {
            return (<components.DropdownIndicator {...props} styles={{ padding: 0 }} >
              {DropdownIndicator}
            </components.DropdownIndicator >)
          },
          IndicatorSeparator: () => IndicatorSeparator
        }}
        // menuIsOpen={true}
        isSearchable={false}
        autoFocus={false}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
        styles={{
          container: () => ({
            width: '100%',
            position: 'relative',
            ...styles.container
          }),
          control: () => (
            {
              display: 'flex',
            }
          ),
          dropdownIndicator: () => ({
            padding: 0,
            textAlign: 'center',
            ...styles.dropdownIndicator
          }),
          valueContainer: () => ({
            position: 'relative',
            width: '100%',
            display: 'flex',
            // justifyContent: 'center',
            ...styles.valueContainer
          }),
          menu: () => ({
            background: 'transparent',
            zIndex: 3,
            width: '100%',
            position: 'absolute',
            display: 'flex',
            justifyContent: 'flex-end',
            paddingRight: 0,
            ...styles.menu
          }),
          menuList: () => ({
            background: 'white',
            width: '100%',
            maxHeight: 220,
            overflowY: 'auto',
            boxShadow: 'box-shadow: 0 4px 8px 0 rgba(0,0,0,0.03)',
            ...styles.menuList
          }),
          option: (style, { data, isDisabled, isFocused, isSelected }) => {
            const focused = _.get(styles.option, 'focused') || {}
            const selected = _.get(styles.option, 'selected') || {}
            return {
              textAlign: 'left',
              borderBottom: '1px solid black',
              padding: 20,
              ...isFocused ? focused : {},
              ...isSelected ? selected : {},
              ...styles.option
            }
          },
        }} />
    )
  }
}
