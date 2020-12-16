import React from 'react';
import { 
              Dialog, 
              DialogTitle, 
              DialogContent,
              Typography, 
              IconButton,
            } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close'


const UploadDialog = (props) => {

  const { title, children, openUploadDialog, setOpenUploadDialog } = props;

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