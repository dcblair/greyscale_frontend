import { Button,
        Grid,
        Input,
        makeStyles,
        Switch,
        TextField,
        Typography } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import UploadModel from '../models/upload';
import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from './userContext';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  div: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
}));

const UploadForm = (props) => {
  const classes = useStyles();

  const history = useHistory();
  
  const { user, currentUser} = useContext(UserContext);
  
  const [name, setName] = useState('');
  const [album, setAlbum] = useState('');
  const [artwork, setArtwork] = useState('');
  const [artist, setArtist] = useState('');
  const [music, setMusic] = useState('');
  const [labelId, setLabelId] = useState('');
  const [genre, setGenre] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [loading, setLoading] = useState(false);
  
  let location = useLocation();

  const uploadArtwork = async () => {
    const files = artwork
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'greyscale_album')
    setLoading(true)
    const res = await fetch(
      `${process.env.REACT_APP_CLOUDINARY_URL}/image/upload`,
      {
        method: 'POST',
        body: data
      }
    )
    let file = await res.json()
    file = await file.secure_url
    setLoading(false)
    return file
  }

  const uploadMusic = async () => {
    const files = music
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'greyscale_music')
    setLoading(true)
    const res = await fetch(
      `${process.env.REACT_APP_CLOUDINARY_URL}/raw/upload`,
      
      {
        method: 'POST',
        body: data
      }
      )
      let file = await res.json()
      file = await file.secure_url
      return file
  }

  const handleSubmit = async e => {
    e.preventDefault();

    const music = await uploadMusic();
    const artwork = await uploadArtwork();
    if(name && artist && album && genre && music && artwork) {
      const userId = localStorage.getItem("id");
      UploadModel.create({ userId, labelId, name, music, artist, album, isPublic, genre, artwork })
      props.setOpenUploadDialog(false)
      if (location.pathname === '/music/mine') {
        window.location.reload()
      } else {
        return history.push('/music/mine')
      }
    } else {
      console.log("Please make sure all fields are full and files are uploaded.")
    }
  }

  return (
    <div className={ classes.div }>
      <form className={ classes.form } action="" id="uploadForm">
        <div aria-label="Entry title textfield">
          <TextField 
            id="outlined-basic" 
            label="track name"
            type="text"
            value={ name }
            onInput={ (e) => setName(e.target.value) }
            variant="outlined" 
          />
        </div>

        <div aria-label="artist">
          <TextField
            id="outlined-multiline-static"
            label="artist name"
            value={ artist }
            type="text"
            onInput={ (e) => setArtist(e.target.value) }
            variant="outlined"
          />
        </div>
        
        <div aria-label="album">
          <TextField
            id="outlined-multiline-static"
            label="album name"
            value={ album }
            type="text"
            onInput={ (e) => setAlbum(e.target.value) }
            variant="outlined"
          />
        </div>

        <div aria-label="genre">
          <TextField
            id="outlined-multiline-static"
            label="genre"
            value={ genre }
            type="text"
            onInput={ (e) => setGenre(e.target.value) }
            variant="outlined"
          />
        </div>

        <div aria-label="labelId">
          <TextField
            id="outlined-multiline-static"
            label="label id"
            value={labelId}
            type="text"
            onInput={ (e) => setLabelId(e.target.value) }
            variant="outlined"
          />
        </div>

        <Typography variant="body1">music file (mp3 only)</Typography>
        <Input
          type="file"
          name="file"
          placeholder="upload music"
          onChange={ (e) => setMusic(e.target.files) }
        />

        <Typography variant="body1">album artwork</Typography>
        <Input
          type="file"
          name="file"
          placeholder="upload album artwork"
          onChange={ (e) => setArtwork(e.target.files) }
        />

        <Grid>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item>private</Grid>
            <Grid item>
              <Switch
                checked={ isPublic }
                onChange={ () => setIsPublic(!isPublic) }
                color="primary"
                name="privacy"
                label="publicOrPrivate"
              />
            </Grid>
            <Grid item>public</Grid>
          </Grid>
        </Grid>
        <Button
          onClick={ handleSubmit }
        >
          submit
        </Button>
      </form>

      { loading ? (
        <Typography>loading...</Typography>
      ): (
        <Typography>success!</Typography>
      )
      }
    </div>
  )
}

export default UploadForm