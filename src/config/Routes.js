import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from '../pages/Home'
import Register from '../pages/Register'
import SearchUploads from '../components/SearchUploads'
import Login from '../pages/Login'
import Profile from '../pages/Profile'
import About from '../pages/About'
import Contact from '../pages/Contact'
import UserMusic from '../components/UserMusic';
import UploadForm from '../components/UploadForm';

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
    <Route path='/upload/' component={ SearchUploads } />
    <Route path='/upload/form' component={ UploadForm } />
    <Route path='/Register/' component={ Register } />
    <Route path='/login' render={(routeComponentProps) => {
      return <Login
              {...routeComponentProps}
              />
    }} />
    <PrivateRoute path='/profile' component={ Profile } />
    <PrivateRoute path='/music/mine' component={ UserMusic } />
  </Switch>
)

export default Routes