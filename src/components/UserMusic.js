import { Button, makeStyles, Paper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import UploadModel from '../models/upload'

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
  paper: {
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
}))

const UserMusic = (props) => {
  const classes = useStyles();

  const [uploads, setUploads] = useState();

  useEffect(() => {
    if(uploads) {
      UploadModel.user(props.currentUser)
        .then(data => setUploads(data.uploads))
    }
  }, [uploads])
  
  return (
    <div>
    <p>Hi!</p>
      { uploads && uploads.map((upload) => (
        <Paper
          className={classes.paper}
          elevation={1}
          style={{
          display:"inline-block",
          textAlign: "center",
          padding: 15
          }}
        >
          <Typography component="h3" variant="h6" key={upload.id}>
          {upload.name}
        </Typography>
        <Typography component="h5" variant="body1" key={upload.artistName}>
          By {upload.artistName}
        </Typography>
        <Typography compoment="p" variant="body1" key={upload.album}>
          {upload.album}
        </Typography>
        {/* <Link to={`/upload/${entry.id}`}>
          <Button color="primary" variant="contained">
            Read more
          </Button>
        </Link> */}
        </Paper>
      ))}
    </div>
  )
}

export default UserMusic
