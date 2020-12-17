import React, { useContext, useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import ExUploads from '../components/ExUploads';
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
    marginLeft: 0,
    width: '100%',
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
  const [searchUploads, setSearchUploads] = useState();

  async function searchTerm(e) {
    e.preventDefault();

    try {
      const data = await UploadModel.search(searchInput)
        setSearchUploads(data.uploads)
        setSearchInput('')
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      { currentUser ? (
        <>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
            </div>
            <form
              onSubmit={ searchTerm }
              noValidate
            >
              <InputBase
                placeholder="search for music..."
                onChange= { (e) => { setSearchInput(e.target.value) } }
                value={ searchInput }
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
              <IconButton type="submit">
                <SearchIcon />
              </IconButton>
            </form>
          </div>
          {

          }
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