import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

const Player = () => {
  const classes = useStyles();
  const theme = useTheme();

  const [isPaused, setIsPaused] = useState(true);

  const handlePlay = () => {
    setIsPaused(!isPaused)
    isPaused ? (
      stopMusic()
    ): (
      playMusic()
    )
  }

  const stopMusic = () => {

  }

  const playMusic = () => {

  }

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            album
            {/* {upload.album} */}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            artist
            {/* {upload.artist} */}
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          <IconButton aria-label="previous">
            {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
          </IconButton>
          <IconButton 
            aria-label="play/pause"
            onClick={ handlePlay }
            >
            <PlayArrowIcon className={classes.playIcon} />
          </IconButton>
          <IconButton aria-label="next">
            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
          </IconButton>
        </div>
      </div>
      <CardMedia
        className={classes.cover}
        image="pull from cloudinary using db string"
        // title={upload.title}
      />
    </Card>
  );
}

export default Player