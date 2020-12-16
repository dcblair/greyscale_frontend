import React, { useContext, useEffect, useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import ExUploads from '../components/ExUploads';
import UploadForm from '../components/UploadForm';
import { UserContext } from '../components/userContext';
import { fade, IconButton, InputBase, makeStyles } from '@material-ui/core';
import SearchUploads from '../components/SearchUploads';
import UploadModel from '../models/upload';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Home = (props) => {
  const classes = useStyles();

  const { currentUser } = useContext(UserContext);
  const [searchInput, setSearchInput] = useState('');
  const [searchUploads, setSearchUploads] = useState([]);

  const searchTerm = () => {
    UploadModel.search(searchInput)
    .then((data) => {
      setSearchUploads(data.upload)
      console.log(searchUploads)
    })
  }

  return (
    <div>
      { currentUser ? (
        <>
          <UploadForm />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
            </div>
            <InputBase
              placeholder="search..."
              onChange= { (e) => { setSearchInput(e.target.value) } }
              value={ searchInput }
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
            <IconButton
              onClick={ searchTerm }
            >
              <SearchIcon />
            </IconButton>
          </div>
          <SearchUploads 
            searchUploads={ searchUploads }
            setSearchUploads= { searchUploads }

          />
        </>
      ) : (
        <>
          <ExUploads />
        </>
      )
      }
    </div>
  )
}

export default Home