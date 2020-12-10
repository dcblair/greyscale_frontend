import { CssBaseline, Paper, ThemeProvider } from '@material-ui/core';
import NavBar from './components/NavBar'
import './App.css';

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <CssBaseline>
          <Paper>
            <NavBar>
              
            </NavBar>
          </Paper>
        </CssBaseline>
      </ThemeProvider>
    </div>
  );
}

export default App;
