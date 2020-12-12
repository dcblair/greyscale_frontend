import { Button,
        Grid,
        Paper,
        TextField
      } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import UserModel from '../models/user';

const useStyles = makeStyles((theme) => ({
  field: {
    width: 300,
    [theme.breakpoints.down('sm')]: {
      width: 300,
    },
    [theme.breakpoints.up('md')]: {
      width: 400,
    },
    [theme.breakpoints.up('lg')]: {
      width: 500,
    }
  },
}))

const Profile = (props) => {
  const classes = useStyles();

  const [artistName, setArtistName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    let userId = localStorage.getItem("id")
    UserModel.update({ artistName, email }, userId)
      .then(() => {
        props.setFormToggle(false)
      })
  }

  return (
    <div>
        <Paper
          className={classes.paper}
          elevation={1}
          style={{
          display:"inline-block",
          textAlign: "center",
          }}
        >
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >

            <form 
                onSubmit={handleSubmit} 
                noValidate 
                autoComplete="off"
            >

              <div aria-label="Entry title textfield">
                <TextField
                  className={classes.field}
                  id="outlined-basic" 
                  label="Title"
                  type="text"
                  value={artistName}
                  defaultValue={props.artistName}
                  onInput={ e => setArtistName(e.target.value)}
                  variant="outlined" 
                />
              </div>

              <div aria-label="Journal entry textfield">
                <TextField
                  className={classes.field}
                  style={{
                    marginTop: 10,
                  }}
                  id="outlined-multiline-static"
                  label="email"
                  value={email}
                  type="text"
                  defaultValue={props.userEmail}
                  onInput={ e => setEmail(e.target.value)}
                  variant="outlined"
                />
              </div>

                <Button
                  type="submit"
                  className={classes.button}
                >
                    Submit
                </Button>
              </form>
          </Grid>
        </Paper>
    </div>
  )
}

export default Profile