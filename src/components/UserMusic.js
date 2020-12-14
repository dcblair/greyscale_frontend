import { Button, 
        Card,
        CardMedia,
        Grid,
        IconButton,
        makeStyles, 
        Typography,
      } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react'
import UploadModel from '../models/upload'
import { UserContext } from '../components/context';
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

  const { user, currentUser, setUser } = useContext(UserContext);
  const [upload] = useState('');
  const [uploads, setUploads] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
      UploadModel.user(currentUser)
        .then(data => setUploads(data.uploads))
  }, [currentUser])
  
  const handleUploadDelete = (uploadId) => {
    UploadModel.delete(user, uploadId)
      .then(data =>
        setUploads(uploads.filter(upload => upload.id !== upload))
      )
  }

  return (
    <div>
      <Typography>
        {user.artistName}'s music
      </Typography>
      { (uploads !== '') ? (
        uploads.map((upload) => (
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
            <IconButton>
              <PlayCircleFilledIcon />
            </IconButton>
            <IconButton>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete" onClick={() => setConfirmOpen(true)}>
              <DeleteIcon />
            </IconButton>
            <ConfirmUploadDialog
              title="delete track?"
              open={ confirmOpen }
              setOpen={ setConfirmOpen }
              onConfirm={ () => handleUploadDelete(upload.id) }
            >
              are you sure you want to delete "{upload.name}"?
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
