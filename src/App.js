import React, { useState } from 'react';
// import { Link, Redirect } from 'react-router-dom';
import { createMuiTheme, CssBaseline, Paper, ThemeProvider } from '@material-ui/core';
import NavBar from './components/NavBar';
import Player from './components/Player';
import Routes from './config/Routes';
import './App.css';
import { UserContextProvider } from './components/userContext';
import { MusicContextProvider } from './components/musicContext';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const font = "'Montserrat', sans-serif";

  const lightTheme = createMuiTheme({
    palette: {
      primary: {
        main: '#C6AB83',
        contrastText: '#000'
      },
      secondary: {
        light: '#fffafd',
        main: '#fff2f2',
        dark: '#ccbfbf',
        contrastText: '#000'
      },
      background: {
        default: '#fffaf0'
      },
    },
    typography: {
      fontFamily: font,
      fontSize: 13
    },
    paper: {
      backgroundColor: '#fffaf0',
    },
  })
  
  const darkTheme = createMuiTheme({
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

  return (
    <div className="App">
      <ThemeProvider>
        <CssBaseline>
          <Paper>
            <UserContextProvider>
              <MusicContextProvider>
            <NavBar
              darkMode={ darkMode }
              setDarkMode={ setDarkMode }
            >
            </NavBar>
            <Player />
            <Routes 
            />
              </MusicContextProvider>
            </UserContextProvider>
          </Paper>
        </CssBaseline>
      </ThemeProvider>
    </div>
  );
}

export default App;
