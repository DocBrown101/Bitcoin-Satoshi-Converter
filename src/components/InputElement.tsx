import {NumericFormat, NumberFormatValues, SourceInfo} from 'react-number-format';

import {InputAdornment, TextField} from '@mui/material';
import {Input as InputIcon} from '@mui/icons-material';

interface InputElementProps {
  readonly label: string;
  readonly endLabel: string;
  readonly value: number | string;
  readonly disabled?: boolean;
  readonly onInputChange: (values: NumberFormatValues, sourceInfo: SourceInfo) => void;
}

export default function InputElement({label, endLabel, value, disabled, onInputChange}: InputElementProps) {
  return (
    <NumericFormat
      id={label}
      label={label}
      value={value}
      onValueChange={onInputChange}
      disabled={disabled}
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
            {endLabel}
          </InputAdornment>
        ),
        autoComplete: 'off'
      }}
      thousandSeparator="."
      decimalSeparator=","
      valueIsNumericString
      isAllowed={(values) => {
        const {floatValue} = values;
        return floatValue === undefined || floatValue >= 0;
      }}
    />
  );
}
