import React from 'react';
import NumberFormat from "react-number-format";

import {Box, InputAdornment, TextField} from '@mui/material';
import {Input as InputIcon} from '@mui/icons-material';

export default function InputElement(props) {
  return (
    <Box textAlign="center" mb={2}>
      <NumberFormat
        id={props.label}
        label={props.label}
        value={props.value}
        //onChange={props.onInputChange}
        onValueChange={props.onInputChange}
        disabled={props.disabled}
        customInput={TextField}
        inputMode="numeric"
        InputProps={{
          sx: {
            "&.Mui-focused .MuiInputAdornment-root .MuiSvgIcon-root": {
              color: 'primary.main'
            }
          },
          startAdornment: (
            <InputAdornment disablePointerEvents={true} position="start">
              <InputIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment disablePointerEvents={true} position="end">
              {props.endLabel}
            </InputAdornment>
          ),
          autoComplete: 'new-password',
          form: {
            autoComplete: 'off',
          }
        }}
        thousandSeparator="."
        decimalSeparator=","
        isNumericString
      />
    </Box>
  );
}
