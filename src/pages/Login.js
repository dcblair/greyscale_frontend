import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import UserModel from '../models/user'


const Login = () => {
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmail = e => {
    setEmail(e.target.value)
  }

  const handlePassword = e => {
    setPassword(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

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
  })
  .catch(err => console.log('Login error', err))

  if (props.currentUser) return <Redirect to='/profile' />

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