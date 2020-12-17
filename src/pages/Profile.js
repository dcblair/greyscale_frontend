import { Button,
        Grid,
        Input,
        Paper,
        TextField,
        Typography
      } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useContext, useState } from 'react';
import UserModel from '../models/user';
import { UserContext } from '../components/userContext';
import ConfirmDialog from '../components/ConfirmDialog';
import '../styles.css';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto'
  },
  form: {
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
      maxWidth: '20vh',
      display: 'flex',
      flexDirection: 'column',
      margin: 'auto'
    },
  },
  paper: {
    color: '#000',
    margin: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      width: 320,
    },
    [theme.breakpoints.up('md')]: {
      width: 600,
      typography: {
        letterSpacing: 2,
        fontSize: 20
      }
    },
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    backgroundColor: '#B8B8B8'
  },
  header: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(3),
    textDecoration: 'underline',
    letterSpacing: 1.5
  },
  input: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1)
  },
  text: {
    marginBottom: theme.spacing(2)
  },
  formButton: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(6),
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 6,
    paddingBottom: 6,
    borderRadius: 6,
    backgroundColor: '#e6e6e6'
  },
  deleteButton: {
    marginBottom: theme.spacing(2)
  }
}))

const Profile = (props) => {
  const userId = localStorage.getItem("id");

  const classes = useStyles();

  const { user, setUser, logout } = useContext(UserContext);
  const [artistName, setArtistName] = useState('');
  const [image, setImage] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);


  const uploadImage = async () => {
    const files = await image
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'greyscale_profile')
    const res = await fetch(
      `${process.env.REACT_APP_CLOUDINARY_URL}/image/upload`,
      {
        method: 'POST',
        body: data
      }
    )
    let file = await res.json()
    file = await file.secure_url
    return file
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const image = await uploadImage();
    UserModel.update({ artistName, image }, userId)
    .then( (data) => {
      setUser({
        artistName,
        image
      })
    });
  }

  const handleDelete = () => {
    UserModel.delete(user, userId)
      .then(
        logout()
      )
  }

  return (
    <Grid
      className={ classes.root }
      container
      spacing={0}
      style={{ minHeight: "50vh" }}
    >
      <Grid item>
        <Paper
          className={ classes.paper }
          elevation={1}
        >
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
          <Typography variant="h5" component="h1" className={ classes.header }>
            profile
          </Typography>

            <form
              className={ classes.form }
              noValidate 
              autoComplete="off"
              onSubmit={ handleSubmit }
            >

              <div aria-label="artist name textfield">
                <TextField
                  className="textField"
                  Props={{className: 'textField'}}
                  id="outlined-multiline-static"
                  label="artist name"
                  type="text"
                  value={ artistName }
                  defaultValue={ user && user.artistName }
                  onInput={ (e) => setArtistName(e.target.value) }
                  variant="outlined" 
                />
              </div>

              <Input
                className={ classes.input }
                type="file"
                name="file"
                placeholder="upload profile picture"
                onChange={ (e) => setImage(e.target.files) }
              />

              <Typography variant="body1" component="h6" className={ classes.text }>
                profile picture
              </Typography>

              <Button
                type="submit"
                className={ classes.formButton  }
              >
                submit
              </Button>
            </form>

            <Button
              aria-label="delete"
              className={ classes.deleteButton }
              onClick={ () => setConfirmOpen(true) }>
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
      </Grid>
    </Grid>
  )
}

export default Profile