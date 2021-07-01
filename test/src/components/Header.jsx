import React, { useContext, useEffect, useState } from 'react'
import './components.css'
import { NavLink, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { UserContext } from '../App'
import { fetchUser } from '../store/actions/asyncActions'

const Header = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState(null)
  const [admin, setAdmin] = useState('')
  const history = useHistory()
  const context = useContext(UserContext)
  useEffect(() => {
    const fetchUserData = async () => {
      await dispatch(fetchUser(context.token))
        .then((data) => {
          setAdmin(data.user.isAdmin)
          setUsername(data.user.username)
        })
    }
    fetchUserData()
  }, [])

  const logOut = () => {
    context.clearUser(context.setToggler)
    history.push('/login')
  }

  const adminRoutes = () => (
    <>
      <NavLink to="/dashboard">
        <p className="link">
          Dashboard
          <span className="material-icons">bar_chart</span>
        </p>
      </NavLink>
      <NavLink to="/users">
        <p className="link">
          Users
          <span className="material-icons">people_alt</span>
        </p>
      </NavLink>
    </>
  )

  return (
    <header className="header">
      <div className="user">
        <div className="avatar">
          <img src="" alt="" />
        </div>
        <div className="nickname"><p>{!username ? 'nickname' : username }</p></div>
      </div>
      <div className="nav-block">
        <nav>
          <NavLink to="/">
            <p className="link">
              Profiles
              <span className="material-icons">person_pin_circle</span>
            </p>
          </NavLink>
          {admin && adminRoutes()}
          <NavLink to="/">
            <p onClick={logOut} className="link log-out">
              LogOut
            </p>
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export { Header }
