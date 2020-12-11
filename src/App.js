import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CssBaseline, Paper, ThemeProvider } from '@material-ui/core';
import NavBar from './components/NavBar';
import Player from './components/Player';
import Routes from './config/Routes';
import './App.css';

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <CssBaseline>
          <Paper>
            <NavBar>
            </NavBar>
            <Player />
            <Routes />
          </Paper>
        </CssBaseline>
      </ThemeProvider>
    </div>
  );
}

export default App;
