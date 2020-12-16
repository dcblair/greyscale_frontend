import { createMuiTheme } from '@material-ui/core/styles'

const font = "'Montserrat', sans-serif";

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#C4D8E7',
      contrastText: '#000'
    },
    secondary: {
      main: '#ff4400',
      constrastText: '000'
    }
  },
  typography: {
    fontFamily: font,
    fontSize: 13,
  },
  overrides: {
    MuiButton: {
      raisedPrimary: {
        color: '#000',
      },
    },
  },
})

export default theme