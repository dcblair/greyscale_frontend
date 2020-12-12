import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import UploadModel from '../models/upload';
import { Grid, Input, Slider } from '@material-ui/core';
import { VolumeUp } from '@material-ui/icons';

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

const Player = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const Ref = useRef();

  const [isPaused, setIsPaused] = useState(true);
  const [upload, setUpload] = useState('');
  const [loadMusic, setLoadMusic] = useState('');
  const [loadNext, setLoadNext] = useState('');
  const [value, setValue] = useState(70);
  const [number, setNumber] = useState(9);

  const num = Math.floor(Math.random(upload))

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (e) => {
    setValue(e.target.value === '' ? '' : Number(e.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };


  useEffect(() =>{
      UploadModel.show(number)
        .then(data => setUpload(data.upload))
  }, [number])

  const handlePlay = () => {
    Ref.current.play()
    setIsPaused(false)
  }

  const handlePause = () => {
    Ref.current.pause()
    setIsPaused(true)
  }

  const handlePrev = () => {
    setNumber(number - 1)
    console.log(number)
  }

  const handleNext = () => {
    setNumber(number + 1) 
      console.log(number)
  }

  const handleVolume = () => {

  }

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h6" variant="h6">
            {upload.name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {upload.artist}
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          <IconButton aria-label="previous">
            {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon onClick={ handlePrev } />}
          </IconButton>
          <audio
            ref={Ref}
            src={upload.music}
          />
          <IconButton 
            aria-label="play/pause"
            onClick={ isPaused ? handlePlay : handlePause }
          >
            { !isPaused ? (
              <PauseIcon
                // onClick={ setIsPaused(!isPaused) }
                fontSize="large"
                className={ classes.pauseIcon } 
              />
            ) : (
              <PlayArrowIcon
                fontSize="small"
                className={ classes.playIcon }
                // onClick={ setIsPaused(!isPaused) }
              />
            )
            }
          </IconButton>
          <IconButton aria-label="next">
            { theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon onClick={ handleNext }/>}
          </IconButton>
        </div>
      </div>
        <CardMedia
          className={ classes.cover }
          image={ upload.artwork }
          title={ upload.artwork }
        />
    <div>
      <Typography id="input-slider" gutterBottom>
        Volume
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <VolumeUp />
        </Grid>
        <Grid item xs>
          <Slider
            value={typeof value === 'number' ? value : 0}
            onChange={ handleSliderChange }
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.input}
            value={value}
            margin="dense"
            onChange={ handleInputChange }
            onBlur={ handleBlur }
            inputProps={{
              step: 10,
              min: 0,
              max: 100,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </div>
    </Card>
  );
}

export default Player