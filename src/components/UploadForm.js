import { Button,
        Grid,
        Input,
        Switch,
        TextField,
        Typography } from '@material-ui/core';
import React, { useState } from 'react';
import UploadModel from '../models/upload';
import { useHistory } from 'react-router-dom';

const UploadForm = () => {
  const history = useHistory();

  const [name, setName] = useState('');
  const [album, setAlbum] = useState('');
  const [artwork, setArtwork] = useState('');
  const [artist, setArtist] = useState('');
  const [music, setMusic] = useState('');
  const [labelId, setLabelId] = useState('');
  const [genre, setGenre] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [loading, setLoading] = useState(false);

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
    
  // useEffect(() => {
  //   if (typeof music === "string" && typeof artwork === "string") {
  //     const userId = localStorage.getItem("id")
  //     UploadModel.create({ userId, labelId, name, music, artist, album, isPublic, genre, artwork })
  //   }
  // }, [music, artwork])

  const handleSubmit = async e => {
    e.preventDefault();

    const music = await uploadMusic();
    const artwork = await uploadArtwork();
    if(name && artist && album && genre && music && artwork) {
      const userId = localStorage.getItem("id");
      UploadModel.create({ userId, labelId, name, music, artist, album, isPublic, genre, artwork })
      return history.push('/music/mine')
    } else {
      console.log("Please make sure all fields are full and files are uploaded.")
    }
  }

  return (
    <div>
      <form action="" id="uploadForm">
        <div aria-label="Entry title textfield">
          <TextField 
            id="outlined-basic" 
            label="track name"
            type="text"
            value={name} 
            onInput={ e => setName(e.target.value)}
            variant="outlined" 
          />
        </div>

        <div aria-label="artist">
          <TextField
            id="outlined-multiline-static"
            label="artist name"
            value={artist}
            type="text"
            onInput={ e => setArtist(e.target.value)}
            variant="outlined"
          />
        </div>
        
        <div aria-label="album">
          <TextField
            id="outlined-multiline-static"
            label="album name"
            value={album}
            type="text"
            onInput={ e => setAlbum(e.target.value)}
            variant="outlined"
          />
        </div>

        <div aria-label="genre">
          <TextField
            id="outlined-multiline-static"
            label="genre"
            value={genre}
            type="text"
            onInput={ e => setGenre(e.target.value)}
            variant="outlined"
          />
        </div>

        <div aria-label="labelId">
          <TextField
            id="outlined-multiline-static"
            label="label id"
            value={labelId}
            type="text"
            onInput={ e => setLabelId(e.target.value)}
            variant="outlined"
          />
        </div>

        <Typography variant="body1">music file</Typography>
        <Input
          type="file"
          name="file"
          placeholder="upload music"
          onChange={e => {setMusic(e.target.files)} }
        />

        <Typography variant="body1">album artwork</Typography>
        <Input
          type="file"
          name="file"
          placeholder="upload album artwork"
          onChange={e => {setArtwork(e.target.files)} }
        />

        <Grid>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item>Private</Grid>
            <Grid item>
              <Switch
                checked={isPublic}
                onChange={() => setIsPublic(!isPublic)}
                color="primary"
                name="privacy"
                label="publicOrPrivate"
              />
            </Grid>
            <Grid item> Public</Grid>
          </Grid>
        </Grid>
        <Button
          onClick={ handleSubmit }
        >
          Submit
        </Button>
      </form>

        {loading ? (
          <Typography>loading...</Typography>
        ): (
          <img src={artwork} alt="album artwork" style={{width: "200px"}}/>
        )
        }
    </div>
  )
}

export default UploadForm