import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import Users from '../pages/Users';
import Profiles from '../pages/Profiles';
import Dashboard from '../pages/Dashboard';
import { Switch, Route, Redirect } from 'react-router-dom'
import { UserContext } from '../App';
import User from '../pages/User';

const Main = () => {

  const context = useContext(UserContext)
  const [ admin, setAdmin ] = useState('')

  useEffect(() => {
    const fetchUser = async() => {
      const user = (await context.getCurrentAccount(context.token)).user
      setAdmin(user.isAdmin)
    }
    fetchUser()
  }, [])

    return(
        <>
        <Header/>
        <main className="main-content">
          <Switch>
            <Route exact path="/" component={Profiles}/>
            <Route path="/dashboard" render={() => admin ? <Dashboard/> : <Redirect to="/" />}/>
            <Route path="/users" render={() => admin ? <Users /> : <Redirect to="/" />}/>
            <Route exact path="/user/:id" component={User}/>
          </Switch>
        </main>
        </>
    )
}

export default Main