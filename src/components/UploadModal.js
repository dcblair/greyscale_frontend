import React from 'react';
import { 
              Dialog, 
              DialogTitle, 
              DialogContent,
              Typography, 
              IconButton,
            } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close'


const NewEntryDialog = (props) => {

  const { title, children, openDialog, setOpenDialog } = props;

  return (
    <Dialog open={ openDialog } >
      <DialogTitle>
        <div style={{ display: 'flex' }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1,  }}>
            {title}
          </Typography>
          <IconButton
            variant="contained"
            aria-label="close"
            onClick={() => { setOpenDialog(false) }}
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

export default NewEntryDialog;