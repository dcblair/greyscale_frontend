import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Button,
        TextField,
        Typography
        } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import UserModel from '../models/user';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));


const Login = props => {
  const classes = useStyles();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
      if(!data.user) {
        console.log('Login unsuccessful')
        return false
      }
      props.storeUser(data.user)
      props.storeArtistName(data.artistName)
      console.log(data.user, data.artistName)
      })
      .catch(err => console.log('Login error', err))
  }


  if (props.currentUser) return <Redirect to='/' />

  return (
    <div>
      <Typography variant="h4">
        Login
      </Typography>
      <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
        <div className="form-group">
          <TextField 
            onChange={ handleEmail }
            value={ email }
            type="email"
            id="email" 
            name="email"
            label="Email" 
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
        <Button 
          variant="contained" 
          color="primary" 
          type="submit"
        >
          Login
        </Button>
      </form>
    </div>
  )
}

export default Login