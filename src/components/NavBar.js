import { AppBar,
        Button,
        IconButton,
        Menu,
        MenuItem,
        Toolbar,
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
    flexGrow: 1
  },
  appBar: {
    background: '#CCCCCC',
    position: 'sticky'
  },
  iconText: {
    marginLeft: 10,
    marginRight: 20,
    color: '#1F1F1F',
    fontWeight: 'bold',
    letterSpacing: 1.2
  },
  appBarWrapper: {
    width: '85%',
    margin: '0 auto'
  },
  homeButton: {
    marginRight: '1rem',
  },
  profileButton: {
    marginLeft: '1rem'
  },
  login: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'end',
  },
  bar: {
    textDecoration: 'none'
  }
}));

const NavBar = (props) => {
  const classes = useStyles();

  const { user, currentUser, logout } = useContext(UserContext);
  
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null)
  };

  useEffect(() => {
    setAnchorEl(false)
  }, [])

  return (
    <div className={ classes.root }>
      <AppBar className={ classes.appBar }>
        <Toolbar className={ classes.appBarWrapper }>
          <Link to={'/'}>
            <Tooltip title='home'>
              <Button className={ classes.homeButton }>
                <img
                src={ logo }
                alt="greyscale logo/home button"
                style={{
                  width: 40
                }}
                />
                <Typography
                  className={ classes.iconText }
                  variant="h5"
                  component="body1"
                >
                  gs
                </Typography>
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
                        src={ user.image }
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
              {/* <div className={ classes.login }> */}
                <Link to={ "/login" }>
                  <Button>
                    login
                  </Button>
                </Link>
                <Typography 
                  className={ classes.bar } 
                  variant="h4"
                  component="body1"
                > 
                  | 
                </Typography>
                <Link to={ "/register" }>
                  <Button>
                    register
                  </Button>
                </Link>
              {/* </div> */}
              </>
            )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavBar