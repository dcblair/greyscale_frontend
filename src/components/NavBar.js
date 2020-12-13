import { Grid,
        IconButton,
        Menu,
        MenuItem,
        Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AccountCircle } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  homeButton: {
    marginRight: '1rem',
  },
  profileButton: {
    marginLeft: '1rem'
  },
  newEntryButton: {
    marginRight: '1rem'
  },

}));

const NavBar = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const open = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null)
  };

  return (
    <div>
      <Grid
        container
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        justify="center"
      >
        { props.currentUser ? (
          <>
            <IconButton
              className={classes.profileButton}
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={ handleMenu }
              color="inherit"
            >
            <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem component={ Link } to={ '/profile' } onClick={ handleClose }>
                Profile
              </MenuItem>
              <MenuItem component={ Link } to={ '/logout' } onClick={ props.logout }>
                Logout
              </MenuItem>
            </Menu>
          </>
        ): (
          <>
            <Link to={ "/login" }>login</Link>
            <Typography variant="body1"> | </Typography>
            <Link to={ "/register" }>register</Link>
          </>
        )}

      </Grid>
    </div>
  )
}

export default NavBar