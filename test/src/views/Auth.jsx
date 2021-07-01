import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Login } from '../pages/Login'
import { Register } from '../pages/Register'

const Auth = () => (
  <Switch>
    <Route exact path="/" component={Register} />
    <Route path="/login" component={Login} />
  </Switch>
)

export { Auth }
