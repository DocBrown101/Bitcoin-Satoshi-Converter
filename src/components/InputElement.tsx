import { NumericFormat, NumberFormatValues, SourceInfo } from 'react-number-format';

import InputAdornment from '@mui/material/InputAdornment';
import InputIcon from '@mui/icons-material/Input';
import TextField from '@mui/material/TextField';
import { isSafeAmount } from '../utils/currencyConverter';

interface InputElementProps {
  readonly label: string;
  readonly endLabel: string;
  readonly value: number | string;
  readonly disabled?: boolean;
  readonly onInputChange: (values: NumberFormatValues, sourceInfo: SourceInfo) => void;
}

export default function InputElement({ label, endLabel, value, disabled, onInputChange }: InputElementProps) {
  const decimalScale = endLabel === 'BTC' ? 8 : endLabel === 'sat' ? 0 : 2;
  return (
    <NumericFormat
      id={label}
      label={label}
      value={value}
      onValueChange={onInputChange}
      disabled={disabled}
      customInput={TextField}
      slotProps={{
        htmlInput: { inputMode: endLabel === 'sat' ? 'numeric' : 'decimal', autoComplete: 'off' },
        input: {
          sx: {
            '&.Mui-focused .MuiInputAdornment-root .MuiSvgIcon-root': {
              color: 'primary.main',
            },
          },
          startAdornment: (
            <InputAdornment disablePointerEvents={true} position='start'>
              <InputIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment disablePointerEvents={true} position='end'>
              {endLabel}
            </InputAdornment>
          ),
        },
      }}
      thousandSeparator='.'
      decimalSeparator=','
      decimalScale={decimalScale}
      allowNegative={false}
      valueIsNumericString
      isAllowed={({ value }) => value === '' || value === '.' || isSafeAmount(value, decimalScale)}
    />
  );
}
