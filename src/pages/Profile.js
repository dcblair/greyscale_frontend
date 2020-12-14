import { Button,
        Grid,
        Input,
        Paper,
        TextField,
        Typography
      } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useContext, useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import UserModel from '../models/user';
import { UserContext } from '../components/userContext';
import ConfirmDialog from '../components/ConfirmDialog';

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
  const userId = localStorage.getItem("id");
  
  const classes = useStyles();
  // const history = useHistory();

  const { user, setUser, logout } = useContext(UserContext);
  const [artistName, setArtistName] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);


  const uploadImage = async () => {
    const files = image
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'greyscale_profile')
    setLoading(true)
    const res = await fetch(
      `${process.env.REACT_APP_CLOUDINARY_URL}/image/upload`,
      {
        method: 'POST',
        body: data
      }
    )
    const file = await res.json()
    setImage(file.secure_url)
    setLoading(false)
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    await uploadImage()

    if(typeof image === "string") {
      UserModel.update({ artistName, image }, userId)
    }
  }

  const handleDelete = () => {
    UserModel.delete(user, userId)
      .then(
        logout()
      )
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
          <Typography>
            { user.artistName }
          </Typography>

            <form 
                noValidate 
                autoComplete="off"
            >

              <div aria-label="artist name textfield">
                <TextField
                  className={classes.field}
                  id="outlined-static" 
                  label="artist name"
                  type="text"
                  value={artistName}
                  defaultValue={user.artistName}
                  onInput={ e => setArtistName(e.target.value)}
                  variant="outlined" 
                />
              </div>

              <Typography variant="body1">profile picture</Typography>
              <Input
                type="file"
                name="file"
                placeholder="upload profile picture"
                onChange={e => {setImage(e.target.files)} }
              />

              <Button
                type="submit"
                onClick={ handleSubmit }
                className={classes.button}
              >
                submit
              </Button>
            </form>
            {loading ? (
              <Typography>loading...</Typography>
            ): (
              <>
              <img src={image} alt="profile picture" style={{width: "200px"}}/>
              </>
            )
            }
            <Button aria-label="delete" onClick={() => setConfirmOpen(true)}>
              delete account
            </Button>
            <ConfirmDialog
              title="delete acount?"
              open={ confirmOpen }
              setOpen={ setConfirmOpen }
              onConfirm={ handleDelete }
            >
              are you sure you want to delete your account?
            </ConfirmDialog>
          </Grid>
        </Paper>
    </div>
  )
}

export default Profile