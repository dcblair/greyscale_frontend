import { Card,
        CardMedia,
        Grid,
        IconButton,
        makeStyles, 
        Typography,
      } from '@material-ui/core';
import React, { useContext, useEffect, useRef, useState } from 'react'
import UploadModel from '../models/upload';
import { UserContext } from './userContext';
import { MusicContext } from './musicContext';
import DeleteIcon from '@material-ui/icons/Delete';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: 'column',
    wordWrap: 'break-word',
    justifyItems: 'center',
    flexGrow: 1,
    '& > *': {
      margin: theme.spacing(.7),
    },
  },
  card: {
    width: 300,
    [theme.breakpoints.down('sm')]: {
      width: 300,
    },
    [theme.breakpoints.up('md')]: {
      width: 700,
    },
    [theme.breakpoints.up('lg')]: {
      width: 1200
    }
  },
  cover: {
    width: 151,
  },
}))

const UserMusic = (props) => {
  const classes = useStyles();

  const Ref = useRef();

  const { user, currentUser} = useContext(UserContext);
  const { setIsPaused,
          setNumber,
          uploads,
          setReady
        } = useContext(MusicContext);

  const [userUploads, setUserUploads] = useState([]);

  useEffect(() => {
      UploadModel.user(currentUser)
        .then(data => {
          setUserUploads(data.uploads)
        })
  }, [currentUser])
  
  const handleUploadDelete = async (uploadId) => {
    UploadModel.delete(user, uploadId)
    window.location.reload()
  }

  const selectTrack = (uploadName) => {
    for (let i = 0; i < uploads.length; i++) {
      if (uploads[i].name === uploadName) {
        setNumber(i)
        setReady(false)
      } else {
        continue
      }
    }
    setIsPaused(false)
  }

  return (
    <div>
      <Typography variant="h6"
      style={{padding: 20}}
      >
        { user.artistName }'s music
      </Typography>
      { (userUploads !== '') ? (
        userUploads.map((upload) => (
        <Card
          className={ classes.Card }
          elevation={1}
          style={{
          display:"inline-block",
          textAlign: "center",
          padding: 30
          }}
        >
          <Typography component="h3" variant="h6" key={ upload.id }>
          { upload.name }
          </Typography>
          <Typography component="h5" variant="body1" key={ upload.artist }>
            { upload.artist }
          </Typography>
          <Typography compoment="p" variant="body1" key={ upload.album }>
            { upload.album }
          </Typography>
          <CardMedia
            className={ classes.cover }
            component="img"
            image={ upload.artwork }
            title={ upload.name }
          />
          <>
            <IconButton onClick={ () => selectTrack(upload.name) }>
              <PlayCircleFilledIcon />
            </IconButton>
            <IconButton aria-label="delete" onClick={ () => handleUploadDelete(upload.id) } >
              <DeleteIcon />
            </IconButton>
          </>  
        </Card>
      ))
      ) : (
        <Typography variant="h6">no uploads, yet.</Typography>
      )
      }
    </div>
  )
}

export default UserMusic
