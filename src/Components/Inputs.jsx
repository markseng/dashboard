import React from 'react';
import {
    TextField, Checkbox, FormControlLabel, FormGroup, FormControl,
    FormLabel, InputAdornment, Select, MenuItem, InputLabel
} from '@material-ui/core';

export const SelectInput = ({ onChange, value, listItens, label, name }) => {


    return (
        <FormControl variant="filled" fullWidth>
            <InputLabel>{label}</InputLabel>
            <Select
                variant='outlined'
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                onChange={onChange}
                fullWidth
                name={name}
            >
                {
                    listItens.map((item, i) => (

                        <MenuItem key={i} value={item.value} >{item.label} </MenuItem>

                    ))
                }

            </Select>
        </FormControl>

    )

}
export const SimpleInput = ({ label, value, onChange, type, name, typeInput }) => {

    return (
      
            <TextField
                required
                typeInput={typeInput}
                value={value}
                label={label}
                onChange={(ev) => onChange(ev)}
                fullWidth
                variant='outlined'
                step='any'
                type={type}
                name={name}

            // InputProps={ type === 'number' ? {...numberProps} : {} }

            />



       
    )
}
export const SelectInputOperador = ({ onChange, value, listItens, label, name }) => {


    return (
        <FormControl variant="filled" fullWidth>
            <InputLabel>{label}</InputLabel>
            <Select
                variant='outlined'
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                onChange={onChange}
                fullWidth
                name={name}
            >
                {
                    listItens.map((item, i) => (

                        <MenuItem key={i} value={item.value} >
                            <item.label />
                        </MenuItem>

                    ))
                }

            </Select>
        </FormControl>

    )

}
export const Textera = ({label, value, onChange, name}) => {


    return (
      <TextField
      fullWidth
      multiline
      variant="outlined"
      label={label}
      value={value}
      name={name}
      onChange={onChange}
      />
  
  
    )
  }