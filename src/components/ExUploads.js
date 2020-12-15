import { Button, 
  Card,
  CardMedia,
  Grid,
  IconButton,
  makeStyles, 
  Typography,
} from '@material-ui/core';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import React, { useContext, useEffect, useState } from 'react';
import UploadModel from '../models/upload';
import { UserContext } from './userContext';
import { MusicContext } from './musicContext';


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

const ExUploads = () => {
  const classes = useStyles();

  const { user, currentUser, setUser } = useContext(UserContext);
  const { uploads,
          setUploads,
          setIsPaused, 
          setNumber } = useContext(MusicContext);

  const [exUploads, setExUploads] = useState([])
  const [upload, setUpload] = useState()

  useEffect(() => {
    UploadModel.random()
    .then(data => {
      setExUploads(data.uploads)
    })
  }, [])

  const selectTrack = (uploadName) => {
    for (let i = 0; i < uploads.length; i++) {
      if (uploads[i].name === uploadName) {
        setNumber(i)
      } else {
        continue
      }
    }
    setIsPaused(false)
  }

  return (
    <div>
    { exUploads && exUploads.map((upload) => (
      <Card
          className={classes.Card}
          elevation={1}
          style={{
          display:"inline-block",
          textAlign: "center",
          padding: 30
          }}
        >
          <Typography component="h3" variant="h6" key={upload.id}>
          {upload.name}
          </Typography>
          <Typography component="h5" variant="body1" key={user.artistName}>
            {user.artistName}
          </Typography>
          <Typography compoment="p" variant="body1" key={upload.album}>
            {upload.album}
          </Typography>
          <CardMedia
            className={ classes.cover }
            component="img"
            image={ upload.artwork }
            title={ upload.artwork }
          />
          <>
            <IconButton onClick={ () => selectTrack(upload.name) }>
              <PlayCircleFilledIcon />
            </IconButton>
          </>  
        </Card>
    ))
    }
    </div>
  )
}

export default ExUploads