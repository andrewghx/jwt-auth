import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Homepage from './pages/homepage'
import Login from './pages/login'
import Register from './pages/register'
import UserDetails from './pages/userDetails'

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Homepage}  />
        <Route path='/login' exact component={Login}  />
        <Route path='/register' exact component={Register}  />
        <Route path='/details' exact component={UserDetails}  />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
