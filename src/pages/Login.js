import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Button,
  Grid,
  Paper,
        TextField,
        Typography
        } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import UserModel from '../models/user';
import { UserContext } from '../components/userContext';
import '../styles.css';

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto'
  },
  form: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      maxWidth: '20vh',
    },
  },
  paper: {
    color: '#000',
    margin: theme.spacing(3),
    display: 'flex',
    width: 300,
    [theme.breakpoints.down('sm')]: {
      width: 320,
    },
    [theme.breakpoints.up('md')]: {
      width: 400,
    },
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    backgroundColor: '#D6D6D6'
  },
  header: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(7),
    textAlign: 'left'
  },
  formButton: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 6,
    paddingBottom: 6,
    borderRadius: 6,
    backgroundColor: '#e6e6e6'
  },
}));

const Login = (props) => {
  const classes = useStyles();

  const { storeUser, currentUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmail = e => {
    setEmail(e.target.value)
  }

  const handlePassword = e => {
    setPassword(e.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    
    UserModel.login({
      email,
      password
    }).then(data => {
      storeUser(data.user)
      if(!data.user) {
        return false
      }
      })
      .catch(err => {
        console.log('Login error', err)})
  }

  if ( currentUser ) return <Redirect to='/' />

  return (
    <Grid
      className={ classes.root }
      container
      justify='center'
      spacing={0}
      style={{ minHeight: "60vh" }}
    >
      <Grid item>
        <Paper className={ classes.paper }>
          <Typography variant="h4" component="h1" className={ classes.header }>
            login
          </Typography>
          <form className={ classes.form } noValidate autoComplete="off" onSubmit={ handleSubmit }>
            <div className="form-group">
              <TextField
                className="textField"
                Props={{ className: 'textField' }}
                onChange={ handleEmail }
                value={ email }
                type="email"
                id="email"
                name="email"
                label="email"
                variant="filled"
                required
              />
            </div>

            <div className="form-group">
            <TextField
              className="textField"
              Props={{ className: 'textField' }}
              onChange={ handlePassword }
              value={ password }
              type="password"
              id="password"
              name="password"
              label="password"
              variant="filled"
              required
            />        
            </div>

            <Button
              className={ classes.formButton }
              variant="contained" 
              color="primary" 
              type="submit"
            >
              login
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Login