import { Button, 
        Grid,
        IconButton,
        Menu,
        MenuItem,
        Tooltip,
        Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AccountCircle } from '@material-ui/icons';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './userContext';
import logo from '../assets/greyscaleicon.png'
import UploadDialog from './UploadDialog';
import UploadForm from './UploadForm';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  homeButton: {
    marginRight: '2rem',
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

  const { user, setUser, currentUser, logout } = useContext(UserContext);
  
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null)
  };

  return (
      <Grid
        container
        display="flex"
        flexDirection="row"
        justifyContent="center"
        verticalAlign="center"
      >
      <Link to={'/'}>
        <Tooltip title='home'>
          <Button className={ classes.button }>
            <img
            src={ logo }
            alt="greyscale logo/home button"
            style={{
              width: 40
            }}
            />
          </Button>
        </Tooltip>
      </Link>
        { currentUser ? (
          <>
            <Tooltip title="menu">
              <IconButton
                className={ classes.profileButton }
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={ handleMenu }
                color="inherit"
              >
                { user && user.image ? (
                  <>
                    <img
                    src={user.image}
                    width={40}
                    />
                  </>
            
                )
                :
                  <>
                    <AccountCircle />
                  </>
                }
              </IconButton>
            </Tooltip>
            <Menu
              id="menu-appbar"
              anchorEl={ anchorEl }
              anchorOrigin={{
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                horizontal: 'right',
              }}
              open={ open }
              onClose={ handleClose }
            >
              <MenuItem component={ Link } to={ '/music/mine' } onClick={ handleClose }>
                music
              </MenuItem>
              <MenuItem component={ Link } to={ '/profile' } onClick={ handleClose }>
                profile
              </MenuItem>
              <MenuItem component={ Link } to={ '/logout' } onChange={ handleClose } onClick={ logout }>
                logout
              </MenuItem>
            </Menu>
            <Button
              onClick={ () => setOpenUploadDialog(true) }
            >
              upload
            </Button>
            <UploadDialog
              openUploadDialog={ openUploadDialog }
              setOpenUploadDialog={ setOpenUploadDialog }
            >
              <UploadForm
                setOpenUploadDialog={ setOpenUploadDialog }
              />
            </UploadDialog>
          </>
        ): (
          <>
            <Link to={ "/login" }>
              <Button
                style={{textTransform: 'none'}}
              >
                login
              </Button>
            </Link>
            <Typography variant="h4"> | </Typography>
            <Link to={ "/register" }>
              <Button
                style={{textTransform: 'none'}}
              >
                register
              </Button>
            </Link>
          </>
        )}
      </Grid>
  )
}

export default NavBar