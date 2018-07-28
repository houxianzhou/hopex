import React, { Component } from 'react'
import Select, { components } from 'react-select'

export default class View extends Component {
  render() {
    return (
      <Select
        options={[
          { value: 'chocolate', label: 'Chocolate' },
          { value: 'strawberry', label: 'Strawberry' },
          { value: 'vanilla1', label: 'Vanilla1' },
          { value: 'vanilla2', label: 'Vanilla2' },
          { value: 'vanilla3', label: 'Vanilla3' },
          { value: 'vanilla4', label: 'Vanilla4' }
        ]}
        components={{
          DropdownIndicator: (props) => {
            return (<components.DropdownIndicator {...props}>
              hahah
            </components.DropdownIndicator >)
          },
          IndicatorSeparator: () => null
        }}
        inputValue={''}
        value={{ value: 'chocolate', label: 'Chocolate' }}
        autoFocus={false}
        // isDisabled={true}
        menuIsOpen={true}
        placeholder={'hahahah'}
        getOptionLabel={
          (option)=>option.label
        }
        getOptionValue={
          (option)=>option.value
        }
        styles={{
          container: () => ({
            position: 'relative',
            // background: 'black',
          }),
          valueContainer:()=>({
            position: 'relative',
            width:'100%',
            display:'flex',
            justifyContent:'center'
            // background:'black'
          }),
          control: () => (
            {
              display: 'flex',
              background: 'red',
              textAlign:'center'
            }
          ),
          menu: () => ({
            display:'flex',
            justifyContent:'flex-end',

            // maxHeight:300,
            // overflowY: 'auto',
            border: '1px solid red'
          }),
          menuList: () => ({
            width:'100%',

            maxHeight:300,
            overflowY:'auto',
            border: '1px solid black'
          }),

          option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
            textAlign: 'center',
            borderBottom: '1px solid blue',
            color: 'blue',
            padding: 20,
          }),
        }} />
    )
  }
}
