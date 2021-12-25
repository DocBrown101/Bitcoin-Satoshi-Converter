import React, {Component} from 'react';
import NumberFormat from "react-number-format";

import {Box, InputAdornment, Grid, TextField} from '@mui/material';
import {Input as InputIcon} from '@mui/icons-material';
import {withStyles} from '@mui/styles';

const styles = theme => ({
  inputAdornmentColor: {
    "&.Mui-focused .MuiInputAdornment-root .MuiSvgIcon-root": {
      color: theme.palette.primary.main
    }
  }
});

function NumberFormatCustom(props) {
  const {inputRef, onChange, ...other} = props;
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value
          }
        });
      }}
      thousandSeparator="."
      decimalSeparator=","
      isNumericString
    />
  );
}

class InputElement extends Component {

  render() {
    const {classes} = this.props;
    return (
      <React.Fragment>
        <Grid item xs={2} sm={3} md={4} />
        <Grid item xs={8} sm={6} md={4} style={{maxWidth: "300px"}}>
          <Box textAlign="center" mb={2}>
            <TextField
              id={this.props.label}
              label={this.props.label}
              value={this.props.value}
              onChange={this.props.onInputChange}
              disabled={this.props.disabled}
              inputMode="numeric"
              InputProps={{
                className: classes.inputAdornmentColor,
                startAdornment: (
                  <InputAdornment disablePointerEvents="true" position="start">
                    <InputIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    {this.props.label}
                  </InputAdornment>
                ),
                autoComplete: 'new-password',
                form: {
                  autoComplete: 'off',
                },
                inputComponent: NumberFormatCustom
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={2} sm={3} md={4} />
      </React.Fragment>
    );
  }
}

export default withStyles(styles, {withTheme: true})(InputElement);
