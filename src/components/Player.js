import React, { useContext,
              useRef,
              useState } from 'react';
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
import { MusicContext } from '../components/musicContext';
import { Grid, Input, Slider } from '@material-ui/core';
import { VolumeUp } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 1,
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
  }
}));

const Player = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const Ref = useRef();

  const { uploads,
          isPaused, setIsPaused,
          number, setNumber,
          ready, setReady
        } = useContext(MusicContext);

  const [value, setValue] = useState(40);
  const [interval] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [scrubValue, setScrubValue] = useState(0);
  const [progress, setProgress] = useState(null);
  const [duration, setDuration] = useState(null);
  const [autoPlay, setAutoPlay] = useState(false);

  // come back to this!
  const handleScrubChange = async (e, newValue) => {
    // scrubValue = await Ref.current.currentTime
    setProgress(newValue)
    setCurrentTime(progress)
  };

  const handleSliderChange = (e, newValue) => {
    setValue(newValue);
    Ref.current.volume = value * .01
  };

  const handleInputChange = (e) => {
    setValue(e.target.value === '' ? '' : Number(e.target.value));
    Ref.current.volume = e.target.value * .01
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };

  const handlePlay = () => {
    Ref.current.play()
    setIsPaused(false)
    setAutoPlay(true)
    setInterval(() => {
      setCurrentTime(Ref.current.currentTime);
      setProgress(Math.round((Ref.current.currentTime / Ref.current.duration) * 100))
      setScrubValue(progress)
    }, 100);
  }

  const handlePause = () => {
    clearInterval(interval)
    Ref.current.pause()
    setIsPaused(true)
  }

  const handlePrev = () => {
    setReady(false)
    if (number > 0) {
      setNumber(number - 1)
      setIsPaused(false)
    } else if (number === 0) {
      setIsPaused(false)
    } else {
      setNumber(0)
    }
  }

  const handleNext = () => {
    setReady(false)
    if (number < uploads.length - 1) {
      setNumber(number + 1)
      setIsPaused(false)
    } else {
      setNumber(uploads.length - 1)
    }
  }

  const getTime = (time) => {
    if (ready) {
      let hours = Math.floor(time / 3600)
      let minutes = Math.floor((time % 3600) / 60)
      let seconds = Math.floor(time % 60)
  
      let songTime = '';
      if (hours > 0) {
        songTime += `${hours}:${minutes < 10 ? '0': ''}`
      }
  
      songTime += `${minutes}:${seconds < 10 ? '0': ''}`
      songTime += `${seconds}`
      return songTime
    }
  }

  return (
    <Card className={ classes.root }>
      <div className={ classes.details }>
        <CardContent className={ classes.content }>
          <Typography component="h6" variant="h6">
            { uploads && ready && uploads[number].name }
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            { uploads && uploads[number].artist }
          </Typography>
        </CardContent>
        <div className={ classes.controls }>
          <IconButton aria-label="previous">
            { theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon onClick={ handlePrev } /> }
          </IconButton>
          <audio
            id="song"
            ref={ Ref }
            src={ uploads && uploads[number].music }
            onLoadedData={ () => setReady(true) }
            currentTime="seconds"
            autoPlay={ autoPlay }
          />
          <IconButton 
            aria-label="play/pause"
            onClick={ isPaused ? handlePlay : handlePause }
          >
            { !isPaused ? (
              <PauseIcon
                fontSize="medium"
                className={ classes.pauseIcon } 
              />
            ) : (
              <PlayArrowIcon
                fontSize="medium"
                className={ classes.playIcon }
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
          image={ uploads && uploads[number].artwork }
          title={ uploads && uploads[number].name }
        />
      <div>
        <Grid
          container
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <VolumeUp />
            </Grid>
            <Grid item xs>
              <Slider
                value={ typeof value === 'number' ? value : 0 }
                onChange={ handleSliderChange }
                aria-labelledby="volume-slider"
              />
            </Grid>
            <Grid item>
              <Input
                className={ classes.input }
                value={ value }
                margin="dense"
                onChange={ handleInputChange }
                onBlur={ handleBlur }
                inputProps={{
                  step: 10,
                  min: 0,
                  max: 100,
                  type: 'number',
                  'aria-labelledby': 'progress-bar',
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
          >
          <Grid container spacing={2}>
            <Grid item>
              <Typography variant="body1">
                { ready && uploads ? getTime(progress): "" }
              </Typography>
            </Grid>
            <Grid item xs>
              <Slider 
                value={ progress }
                onChange={ handleScrubChange }
                max={ ready && uploads ? Ref.current.duration: 0 }
                aria-labelledby="continuous-slider" />
            </Grid>
            <Typography 
              variant="body1"
            >
              { ready && uploads ? getTime(Ref.current.duration): "" }
            </Typography>
          </Grid>
          </Grid>
        </Grid>
      </div>
    </Card>
  );
}

export default Player