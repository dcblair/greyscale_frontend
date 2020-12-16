import React, { useState } from 'react';
import { CssBaseline, Paper, ThemeProvider } from '@material-ui/core';
import NavBar from './components/NavBar';
import Player from './components/Player';
import Routes from './config/Routes';
import theme from './theme';
import { UserContextProvider } from './components/userContext';
import { MusicContextProvider } from './components/musicContext';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
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
