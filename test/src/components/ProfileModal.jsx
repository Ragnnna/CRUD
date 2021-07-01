import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { fetchUser, fetchUsers, updateProfile } from '../store/actions/asyncActions'
import { CLOSE_MODAL } from '../store/environment'
import './components.css'

const ProfileModal = ({ currentUser }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const id = history.location.pathname.slice(6, history.location.pathname.length)
  const [user, setUser] = useState({
    username: '',
    email: '',
    isAdmin: '',
  })

  useEffect(() => {
    dispatch(fetchUsers())
    dispatch(fetchUser(id))
    const profile = currentUser[0]
    return setUser((state) => ({
      ...state, username: profile.username, email: profile.email, isAdmin: profile.isAdmin,
    }))
  }, [])

  const changeHandler = (e) => {
    const { name, value } = e.target
    const elementId = e.target.id
    if (elementId === 'user') {
      return setUser((state) => ({ ...state, isAdmin: false }))
    } else if (elementId === 'admin') {
      return setUser((state) => ({ ...state, isAdmin: true }))
    }
    setUser((state) => ({ ...state, [name]: value }))
  }

  const updateUserHandler = async () => {
    dispatch({ type: CLOSE_MODAL, payload: { type: 'profile', name: '' } })
    await dispatch(updateProfile({
      username: user.username, email: user.email, isAdmin: user.isAdmin,
    }, id))
  }
  return (
    <div className="profile-modal-area">
      <div className="profile-modal-block">
        <form className="form">
          <div className="form-block">
            <label htmlFor="form-element-1">
              <span className="form-element">user name:</span>
              <input
                onChange={changeHandler}
                value={user.username}
                type="text"
                name="username"
                className="input-text form-element"
                id="form-element-1"
              />
            </label>
          </div>
          <div className="form-block">
            <label htmlFor="form-element-2">
              <span className="form-element">email:</span>
              <input
                onChange={changeHandler}
                value={user.email}
                type="text"
                name="email"
                className="input-text form-element"
                id="form-element-2"
              />
            </label>
          </div>
          <div className="form-block">
            <label htmlFor="user">
              <span>role:</span>
              <div className="radio-btns-profile">
                <div className="radio-btn">
                  <input
                    onChange={changeHandler}
                    checked={!user.isAdmin}
                    value={user.isAdmin}
                    id="user"
                    type="radio"
                    name="gender"
                  />
                  user
                </div>
                <div className="radio-btn">
                  <input
                    onChange={changeHandler}
                    checked={user.isAdmin}
                    value={user.isAdmin}
                    type="radio"
                    id="admin"
                    name="gender"
                  />
                  admin
                </div>
              </div>
            </label>
          </div>
          <div className="interface-modal">
            <a href onClick={updateUserHandler}><span className="material-icons btn">done</span></a>
            <a href onClick={() => dispatch({ type: CLOSE_MODAL, payload: { type: 'profile', name: '' } })}><span className="material-icons btn">close</span></a>
          </div>
        </form>
      </div>
    </div>
  )
}

export { ProfileModal }
