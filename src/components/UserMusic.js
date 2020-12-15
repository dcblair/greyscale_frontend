import { Button, 
        Card,
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
import EditIcon from '@material-ui/icons/Edit';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import UserModel from '../models/user';
import ConfirmUploadDialog from './ConfirmUploadDialog';
import { Link } from 'react-router-dom';


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

  const { user, 
          currentUser,
        } = useContext(UserContext);
  const { setIsPaused,
          setNumber,
          uploads,
          setUploads
        } = useContext(MusicContext);

  const [userUploads, setUserUploads] = useState([])
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
      UploadModel.user(currentUser)
        .then(data => setUserUploads(data.uploads))
  }, [currentUser])
  
  const handleUploadDelete = (uploadId) => {
    UploadModel.delete(user, uploadId)
      .then(data =>
        setUploads(uploads.filter(upload => upload.id !== upload))
      )
  }

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
      <Typography>
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
          <Typography component="h5" variant="body1" key={ user.artistName }>
            { user.artistName }
          </Typography>
          <Typography compoment="p" variant="body1" key={ upload.album }>
            { upload.album }
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
            <IconButton>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete" onClick={ () => setConfirmOpen(true) }>
              <DeleteIcon />
            </IconButton>
            <ConfirmUploadDialog
              title="delete track?"
              open={ confirmOpen }
              setOpen={ setConfirmOpen }
              onConfirm={ () => handleUploadDelete(upload.id) }
            >
              are you sure you want to delete "{ upload.name }"?
            </ConfirmUploadDialog>
          </>  
        </Card>
      ))
      ) : (
          <Link to={ "/UploadForm" }>upload music</Link>
      )
      }
    </div>
  )
}

export default UserMusic
