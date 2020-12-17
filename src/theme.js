import { createMuiTheme } from '@material-ui/core/styles'

const chivo = "'Chivo', sans-serif";
const mont = "'Montserrat', sans-serif";
const noto = "'Noto Sans JP', sans-serif";

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#e6e6e6',
      contrastText: '#000'
    },
    secondary: {
      main: '#ff4400',
      constrastText: '000'
    }
  },
  layout: {
    textAlign: 'right'
  },
  typography: {
    h4: {
      fontFamily: mont,
      fontWeight: 400,
      textDecoration: "underline",
      letterSpacing: 1.2
    },
    h5: {
      fontFamily: chivo
    },
    h6: {
      fontFamily: noto,
      fontWeight: 300
    },
    body1: {
      fontFamily: mont,
      fontSize: 14
    }
  },
  overrides: {
    MuiButton: {
      root: {
        color: '#000',
        textTransform: 'none',
        fontFamily: noto,
        fontSize: 15,
      }
    },
    MuiPaper: {
      root: {
        background: '#e6e6e6',
      }
    }
  },
})

export default theme