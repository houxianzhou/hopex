import React, { Component } from 'react'
import Select, { components } from 'react-select'

export default class View extends Component {
  render() {
    const {
      DropdownIndicator, IndicatorSeparator = null, placeholder = 'placeholder',
      getOptionLabel = (option) => option.label, getOptionValue = (option) => option.value,
      options = [], defaultValue = {}, value = {}, onChange, styles = {},

    } = this.props
    return (
      <Select
        options={options}
        components={{
          DropdownIndicator: (props) => {
            return (<components.DropdownIndicator {...props} styles={{ padding: 0 }} >
              {DropdownIndicator}
            </components.DropdownIndicator >)
          },
          IndicatorSeparator: () => IndicatorSeparator
        }}
        // inputValue={''}
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
            justifyContent: 'center',
            ...styles.valueContainer
          }),
          menu: () => ({
            background: 'white',
            zIndex: 3,
            width: '100%',
            position: 'absolute',
            display: 'flex',
            justifyContent: 'flex-end',
            paddingRight: 0,
            ...styles.menu
          }),
          menuList: () => ({
            width: '100%',
            maxHeight: 300,
            overflowY: 'auto',
            boxShadow: '-1px 1px 5px #949494',
            ...styles.menuList
          }),
          option: (_, { data, isDisabled, isFocused, isSelected }) => ({
            textAlign: 'center',
            borderBottom: '1px solid black',
            padding: 20,
            ...styles.option
          }),
        }} />
    )
  }
}
