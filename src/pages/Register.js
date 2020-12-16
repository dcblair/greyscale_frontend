import React, { useState } from 'react';
import UserModel from '../models/user';
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      width: '25ch',
    },
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
    <div>
      <h4>Register</h4>
      <form
        className={ classes.root } 
        noValidate
        autoComplete="off"
      >
        <div className="form-group">
          <TextField
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
            onChange={ handleConfirmPassword } 
            value={ confirmPassword } 
            type="password" 
            id="confirm-password" 
            name="confirm-password" 
            label="confirm your password"
            variant="filled"
            required
          />
        </div>

        <Button
          onClick={ handleSubmit } 
          variant="contained" 
          color="primary" 
          type="submit"
        >
          register
        </Button>
      </form>
    </div>
  )
}

export default Register