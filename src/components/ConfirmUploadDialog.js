import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

// Drop in component for confirmation actions
const ConfirmUploadDialog = (props) => {

  const { title, children, open, setOpen, onConfirm } = props;

  return (
    <Dialog
      open={ open }
      onClose={() => setOpen(false)}
      aria-labelledby="Confirmation Dialog"
    >
      {/* inherits title and content as a prop from the parent component */}
      <DialogTitle id="confirm-dialog">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => setOpen(false)}
          color="secondary"
        >
          no
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setOpen(false);
            onConfirm();
          }}
          color="default"
        >
          yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmUploadDialog;