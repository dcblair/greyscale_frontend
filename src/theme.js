import { createMuiTheme } from '@material-ui/core/styles'

const chivo = "'Chivo', sans-serif";
const mont = "'Montserrat', sans-serif";

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
    h3: {
      fontFamily: chivo,
      fontWeight: 400,
      fontStyle: "normal"
    },
    body1: {
      fontFamily: mont,
      fontSize: 13
    }
  },
  overrides: {
    MuiButton: {
      root: {
        color: '#000',
        textTransform: 'none',
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