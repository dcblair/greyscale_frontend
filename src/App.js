import { CssBaseline, 
          Grid,
          makeStyles,
          ThemeProvider
        } from '@material-ui/core';
import NavBar from './components/NavBar';
import Player from './components/Player';
import Routes from './config/Routes';
import theme from './theme';
import { UserContextProvider } from './components/userContext';
import { MusicContextProvider } from './components/musicContext';
import './App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
  },
  grid: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className={ classes.root }>
      <ThemeProvider theme={theme}>
        <CssBaseline>
            <UserContextProvider>
              <MusicContextProvider>
                <Grid
                className={ classes.grid }
                container
                justify="center"
                >
                  <Grid item>
                    <NavBar />
                  </Grid>
                  <Grid item>
                    <Player />
                  </Grid>
                  <Grid item>
                    <Routes />
                  </Grid>
                </Grid>
              </MusicContextProvider>
            </UserContextProvider>
        </CssBaseline>
      </ThemeProvider>
    </div>
  );
}

export default App;
