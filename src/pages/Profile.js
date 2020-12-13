import { Button,
        Grid,
        Input,
        Paper,
        TextField,
        Typography
      } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
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
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState('');


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

  useEffect(() => {
    if(props.currentUser) {
      UserModel.show(props.currentUser)
        .then(data => setUser(data.user))
    }
  }, [props.currentUser])

  const handleSubmit = async (e) => {
    e.preventDefault()

    await uploadImage()
    console.log(props.currentUser)
    UserModel.update({ artistName, email, image }, props.currentUser)
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
          <Typography>
            { user.artistName }
          </Typography>

            <form 
                onSubmit={ handleSubmit } 
                noValidate 
                autoComplete="off"
            >

              <div aria-label="artist name textfield">
                <TextField
                  className={classes.field}
                  id="outlined-basic" 
                  label="artist name"
                  type="text"
                  value={artistName}
                  defaultValue={ user.artistName }
                  onInput={ e => setArtistName(e.target.value)}
                  variant="outlined" 
                />
              </div>

              <div aria-label="email textfield">
                <TextField
                  className={classes.field}
                  style={{
                    marginTop: 10,
                  }}
                  id="outlined-multiline-static"
                  label="email"
                  value={email}
                  type="text"
                  defaultValue={ user.email }
                  onInput={ e => setEmail(e.target.value)}
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
                className={classes.button}
              >
                submit
              </Button>
            </form>
            {loading ? (
              <Typography>loading...</Typography>
            ): (
              <img src={image} alt="profile picture" style={{width: "200px"}}/>
            )
            }
          </Grid>
        </Paper>
    </div>
  )
}

export default Profile