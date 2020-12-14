import React, { createContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import UserModel from "../../models/user";

export const Context = createContext({});

export const Provider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('id'));
  const [user, setUser] = useState('');

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
        setCurrentUser(null)
        return <Redirect to='/' />
      })
  }

  const userContext = {
    currentUser,
    user,
    setUser,
    logout
  }

  return <Context.Provider value={ userContext }>{children}</Context.Provider>;
}

export const { Consumer } = Context;