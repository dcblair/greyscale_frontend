import React, { createContext, useEffect, useState } from "react";

import { Redirect, useHistory } from "react-router-dom";
import UserModel from "../../models/user";

export const Context = createContext({});

export const Provider = ({ children }) => {
  const history = useHistory();

  const [currentUser, setCurrentUser] = useState(localStorage.getItem('id'));
  const [user, setUser] = useState('');
  const [artistName, setArtistName] = useState(user.artistName)

  const storeUser = (userId) => {
    localStorage.setItem('id', userId)
    setCurrentUser( userId )
  }

  useEffect(() => {
    if(currentUser) {
      UserModel.show(currentUser)
        .then(data => setUser(data.user))
    }
  }, [currentUser])


  const logout = (e) => {
    e.preventDefault()
  
    localStorage.removeItem('id')
  
    UserModel.logout()
      .then(res => {
        history.push('/')
        setCurrentUser(null)
      })
  }

  const userContext = {
    currentUser,
    user,
    setUser,
    storeUser,
    artistName,
    setArtistName,
    logout,
  }

  return <Context.Provider value={ userContext }>{children}</Context.Provider>;
}

export const { Consumer } = Context;