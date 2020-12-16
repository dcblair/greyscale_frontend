import { Button, 
  Card,
  CardMedia,
  IconButton,
  makeStyles, 
  Typography,
} from '@material-ui/core';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import React, { useContext } from 'react';
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

const SearchUploads = (props) => {
  const classes = useStyles();

  const { uploads,
          setIsPaused, 
          setNumber,
          setReady
        } = useContext(MusicContext);


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
    { props.searchUploads && props.searchUploads.map((upload) => (
      <Card
          className={classes.Card}
          elevation={1}
          style={{
          display:"inline-block",
          textAlign: "center",
          padding: 30
          }}
        >
          <Typography component="h3" variant="h6" key={ upload.id } gutterBottom>
          {upload.name}
          </Typography>
          <Typography component="h5" variant="body1" key={ upload.artist } gutterBottom>
            {upload.artist}
          </Typography>
          <Typography compoment="p" variant="body1" key={ upload.album } gutterBottom>
            {upload.album}
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
          </>  
        </Card>
    ))
    }
    </div>
  )
}

export default SearchUploads