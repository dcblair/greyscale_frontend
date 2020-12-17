import React from 'react';
import { 
              Dialog, 
              DialogTitle, 
              DialogContent,
              Typography, 
              IconButton,
              makeStyles,
            } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
// root: {
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'center',
//   margin: 'auto',
//   alignItems: 'center',
// },
}));

const UploadDialog = (props) => {
  const classes = useStyles();

  const { children, openUploadDialog, setOpenUploadDialog } = props;

  return (
    <Dialog open={ openUploadDialog } >
      <DialogTitle>
        <div style={{ display: 'flex' }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1, }}>
            upload a track
          </Typography>
          <IconButton
            variant="contained"
            aria-label="close"
            onClick={ () => { setOpenUploadDialog(false) } }
          >
            <CloseIcon color="action"/>
          </IconButton>  
        </div>
      </DialogTitle>
      <DialogContent dividers>
        {children} 
      </DialogContent>
    </Dialog>
  )
}

export default UploadDialog