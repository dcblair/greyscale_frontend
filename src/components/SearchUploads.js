import { Card,
  CardMedia,
  IconButton,
  makeStyles, 
  Typography,
} from '@material-ui/core';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import React, { useContext } from 'react';
import { MusicContext } from './musicContext';
import '../styles.css';

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
  Card: {
    background: '#B8B8B8',
    [theme.breakpoints.down('sm')]: {
      width: 320,
      height: 380
    },
    [theme.breakpoints.up('md')]: {
      width: 300,
      height: 380,
      margin: 20
    },
    [theme.breakpoints.up('lg')]: {
      width: 300,
      height: 380,
      margin: 20
    }
  },
  cover: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 151,
  },
  header: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(3),
    color: '#E6E6E6',
    letterSpacing: 1.5,
    textDecoration: 'underline'
  },
  icons: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  name: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1.5),
    wordWrap: 'break-word',
    color: '#E6E6E6',

  },
  artist: {
    marginBottom: theme.spacing(1),
    fontSize: 18,
    letterSpacing: 1.2,
    fontWeight: 300,
    color: '#5C5C5C'
  },
  album: {
    marginBottom: theme.spacing(1.5),
    fontWeight: 400,
    color: '#3D3D3D'
  }
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
    <div className={ classes.root }>
      { props.searchUploads && props.searchUploads.map((upload) => (
        <Card
          className={ classes.Card }
          elevation={1}
          style={{
          display:"inline-block",
          textAlign: "center",
          wordWrap: "break-word",
          padding: 10
          }}
        >
          <Typography
            className={ classes.name}
            component="h2"
            variant="h5"
            key={ upload.id }
          >
            { upload.name }
          </Typography>
          <Typography
            className={ classes.artist }
            component="h3"
            variant="body1"
            key={ upload.artist }
          >
            { upload.artist }
          </Typography>
          <Typography
            className={ classes.album }  
            component="h3"
            variant="h6"
            key={ upload.album }
          >
            { upload.album }
          </Typography>
          <CardMedia
            className={ classes.cover }
            component="img"
            alt={ upload.album }
            image={ upload.artwork }
            title={ upload.name }
          />
          <div className={ classes.icons }>
            <IconButton onClick={ () => selectTrack(upload.name) }>
              <PlayCircleFilledIcon />
            </IconButton>
          </div>
        </Card>
      ))
      }
    </div>
  )
}

export default SearchUploads