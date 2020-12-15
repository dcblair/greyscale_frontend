import React, { useContext,
              useEffect,
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

  const { isPaused,
          setIsPaused,
          number,
          setNumber,
          uploads,
        } = useContext(MusicContext);

  const [value, setValue] = useState(40);
  // const [currentTime, setCurrentTime] = useState();
  const [scrubValue, setScrubValue] = useState();

  // come back to this!
  const handleScrubChange = (e, newValue) => {
    newValue = Ref.current.currentTime
    setScrubValue(newValue + 20);
    let currentTime = Ref.current.currentTime
    let duration = Ref.current.duration
    console.log(newValue)
  };

  // useEffect(() => {
  //   console.log(Ref.current.currentTime)
  // }, [Ref.current.currentTime])

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
  }

  const handlePause = () => {
    Ref.current.pause()
    setIsPaused(true)
  }

  const handlePrev = () => {
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
    if (number < uploads.length - 1) {
      setNumber(number + 1)
      setIsPaused(false)
    } else {
      setNumber(uploads.length - 1)
    }
  }

  return (
    <Card className={ classes.root }>
      <div className={ classes.details }>
        <CardContent className={ classes.content }>
          <Typography component="h6" variant="h6">
            { uploads && uploads[number].name }
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
            currentTime="seconds"
            autoPlay={ true }
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
          <Typography id="input-slider" gutterBottom>
            Volume
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <VolumeUp />
            </Grid>
            <Grid item xs>
              <Slider
                value={ typeof value === 'number' ? value : 0 }
                onChange={ handleSliderChange }
                aria-labelledby="input-slider"
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
                  'aria-labelledby': 'input-slider',
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
          >
          <Typography id="continuous-slider" gutterBottom>
            Scrubbing
          </Typography>
          <Grid container spacing={2}>
            <Grid item>
              <Typography variant="body1">
                0:00
              </Typography>
            </Grid>
            <Grid item xs>
              <Slider value={ scrubValue } onChange={ handleScrubChange }  aria-labelledby="continuous-slider" />
            </Grid>
            <Typography 
              variant="body1"
            >
              { Ref.duration }
            </Typography>
          </Grid>
          </Grid>
        </Grid>
      </div>
    </Card>
  );
}

export default Player