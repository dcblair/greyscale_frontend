import React, { useState } from 'react';
import UserModel from '../models/user';
import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
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
    [theme.breakpoints.down('sm')]: {
      width: 350,
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
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(7),
    textAlign: 'left'
  },
  formButton: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 6,
    paddingBottom: 6,
    borderRadius: 6,
    backgroundColor: '#e6e6e6'
  },
}));


const Register = props => {
  const classes = useStyles();

  const [artistName, setArtistName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleArtistName = e => {
    setArtistName(e.target.value)
  }
  
  const handleEmail = e => {
    setEmail(e.target.value)
  }
  const handlePassword = e => {
    setPassword(e.target.value)
  }
  const handleConfirmPassword = e => {
    setConfirmPassword(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (password === confirmPassword) {
      UserModel.create({ artistName, email, password })
        .then(data => {
          console.log('Successful register', data)
          props.history.push('/login')
        })
    }
  }
  

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
          <Typography variant="h3" component="h1" className={ classes.header }>
            register
          </Typography>
          <form
            className={ classes.form } 
            noValidate
            autoComplete="off"
          >
            <div className="form-group">
              <TextField
                className="textField"
                Props={{className: 'textField'}}
                onChange={ handleArtistName } 
                value={ artistName }
                type="text" 
                id="artistName" 
                name="artist name"
                label="artist name" 
                variant="filled"
                required
              />
            </div>

            <div className="form-group">
              <TextField
                className="textField"
                Props={{className: 'textField'}}
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
                Props={{className: 'textField'}}
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

            <div className="form-group">
              <TextField
                className="textField"
                Props={{className: 'textField'}}
                onChange={ handleConfirmPassword } 
                value={ confirmPassword } 
                type="password" 
                id="confirm-password" 
                name="confirm-password" 
                label="confirm password"
                variant="filled"
                required
              />
            </div>

            <Button
              className={ classes.formButton }
              onClick={ handleSubmit } 
              variant="contained" 
              color="primary" 
              type="submit"
            >
              register
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Register