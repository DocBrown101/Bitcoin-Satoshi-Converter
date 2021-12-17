import {createTheme, ThemeProvider} from '@material-ui/core/styles';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

const withThemeProvider=(Story,context)=>{
  const appliedTheme = createTheme(false ? dark : light);
  return (
    <ThemeProvider theme={appliedTheme}>
      <Story {...context} />
    </ThemeProvider>
  )
}
export const decorators = [withThemeProvider];
export const light = {
  palette: {
    type: 'light',
    primary: {
      main: '#FF9800',
    },
    secondary: {
      main: '#008000',
    },
  },
};
export const dark = {
  palette: {
    type: 'dark',
    primary: {
      main: '#FF9800',
    },
    secondary: {
      main: '#008000',
    },
  },
};
