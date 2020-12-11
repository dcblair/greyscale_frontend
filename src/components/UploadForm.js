import { Button, Typography } from '@material-ui/core';
import React, { useState } from 'react';

const UploadForm = () => {
  const [artwork, setArtwork] = useState('')
  const [music, setMusic] = useState('')
  const [loading, setLoading] = useState(false)

  const uploadArtwork = async () => {
    const files = artwork
    const data = new FormData()
    console.log(files)
    data.append('file', files[0])
    data.append('upload_preset', 'greyscale_album')
    setLoading(true)
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/girielyims/image/upload",
      {
        method: 'POST',
        body: data
      }
    )
    console.log(res)
    const file = await res.json()
    setArtwork(file.secure_url)
    setLoading(false)
  }

  const uploadMusic = async () => {
    const files = music
    console.log(files)
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'greyscale_music')
    setLoading(true)
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/girielyims/raw/upload",
      {
        method: 'POST',
        body: data
      }
    )
    const file = await res.json()
    setMusic(file.secure_url)
    setLoading(false)
  }

  const handleSubmit = () => {
    // if(artist && genre &&  )
    // db call and cloudinary
    // separate fetches
    // await cloudinary calls music
    // no async useEffect, but useEffect can call async functions
    // one call for db
    // validate music && art
    if(music && artwork) {
      uploadMusic()
      uploadArtwork()
    }
  }

  return (
    <div>
      <form action="">
        <Typography variant="body1">music file</Typography>
        <input 
          type="file"
          name="file"
          placeholder="upload music"
          onChange={e => {setMusic(e.target.files)} }
        />
        <Typography variant="body1">album artwork</Typography>
        <input
          type="file"
          name="file"
          placeholder="upload album artwork"
          onChange={e => {setArtwork(e.target.files)} }
        />
        <Button
          onClick={ handleSubmit }
        >
          Submit
        </Button>
      </form>
        {loading ? (
          <Typography>loading...</Typography>
        ): (
          <img src={artwork} style={{width: "200px"}}/>
        )
        }
    </div>
  )
}

export default UploadForm