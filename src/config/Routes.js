import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from '../pages/Home'
import Register from '../pages/Register'
import Uploads from '../components/Uploads'
import Login from '../pages/Login'
import Profile from '../pages/Profile'
import About from '../pages/About'
import Contact from '../pages/Contact'
import UserMusic from '../components/UserMusic';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const currentUser = localStorage.getItem('id')
  return  <Route { ...rest } render={ props => {
            return currentUser ? <Component { ...rest } { ...props } /> : <Redirect to="/login" />
          }} 
  />
}

const Routes = (props) => (
  <Switch>
    <Route exact path='/' component={ Home } />
    <Route path='/about' component={ About } />
    <Route path='/contact' component={ Contact } />
    <Route path='/upload/' component={ Uploads } />
    <Route path='/Register/' component={ Register } />
    <Route path='/login' render={(routeComponentProps) => {
      return <Login
              {...routeComponentProps}
              currentUser={ props.currentUser }
              storeUser={ props.storeUser }
              />
    }} />
    <PrivateRoute path='/profile' component={ Profile } currentUser={ props.currentUser } />
    <PrivateRoute path='/music/mine' component={ UserMusic } currentUser={ props.currentUser } />
  </Switch>
)

export default Routes