import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { createMuiTheme, CssBaseline, Paper, ThemeProvider } from '@material-ui/core';
import NavBar from './components/NavBar';
import Player from './components/Player';
import Routes from './config/Routes';
import UserModel from './models/user';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('id'));
  const [currentArtist, setCurrentArtist] = useState(localStorage.getItem('artistName'));
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


  const storeUser = (userId) => {
    localStorage.setItem('id', userId)
    setCurrentUser( userId )
  }
  
  const storeArtistName = (artistName) => {
    localStorage.setItem('artistName', artistName)
    setCurrentArtist( artistName )
    console.log(artistName)
  }
  
  const logout = (event) => {
    event.preventDefault()
  
    localStorage.removeItem('id')
    localStorage.removeItem('artistName')
  
    UserModel.logout()
      .then(res => {
        setCurrentUser(null)
        return <Redirect to='/' />
      })
  }

  return (
    <div className="App">
      <ThemeProvider>
        <CssBaseline>
          <Paper>
            <NavBar
              currentUser={ currentUser } 
              currentArtist={ currentArtist } 
              logout={ logout }
              darkMode={ darkMode }
              setDarkMode={ setDarkMode }
            >
            </NavBar>
            <Player />
            <Routes 
              currentUser={ currentUser }
              currentArtist={ currentArtist }
              storeUser={ storeUser }
              storeArtistName={ storeArtistName }
            />
          </Paper>
        </CssBaseline>
      </ThemeProvider>
    </div>
  );
}

export default App;
