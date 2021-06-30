import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import Users from '../pages/Users';
import Profiles from '../pages/Profiles';
import Dashboard from '../pages/Dashboard';
import { Switch, Route, Redirect } from 'react-router-dom'
import { UserContext } from '../App';
import User from '../pages/User';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../store/actions/asyncActions';

const Main = () => {

  const dispatch = useDispatch()
  const context = useContext(UserContext)
  const [ admin, setAdmin ] = useState('')

  useEffect(() => {
    const fetchUserData = async() => {
      await dispatch(fetchUser(context.token))
      .then(data => {
          setAdmin(data.user.isAdmin)
      })
  }
  fetchUserData()
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