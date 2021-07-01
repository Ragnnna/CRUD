import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { PageTitle } from '../components/PageTitle'
import { ProfileModal } from '../components/ProfileModal'
import { ProfileCard } from '../components/ProfileCard'
import './pages.css'
import { SHOW_MODAL } from '../store/reducers/modalReduser'
import { deleteProfile, fetchUsers } from '../store/actions/asyncActions'
import { UserContext } from '../App'

const User = ({ match }) => {
  const history = useHistory()
  const modals = useSelector((state) => state.modal)
  const userState = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const id = match.url.slice(6, match.url.length)
  const context = useContext(UserContext)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  const user = userState.users.filter((el) => el._id === id)

  if (user === undefined) {
    return history.push('/')
  }

  const profileModalRender = () => <ProfileModal currentUser={user} />

  const showModal = () => {
    dispatch({ type: SHOW_MODAL, payload: { type: 'profile', name: '' } })
  }

  const deleteProfileHandler = () => {
    if (id === context.token) {
      dispatch(deleteProfile(user._id))
      localStorage.removeItem('token')
      context.setToggler((state) => !state)
      return history.push('/login')
    }
    dispatch(deleteProfile(user._id))
  }

  const mappedUsers = userState
    .users
    .filter((el) => id === el.token && el.main === false)
    .map((el) => <ProfileCard key={el._id} user={el} />)

  const renderProfiles = () => {
    const userData = userState.users.find((el) => el._id === id)
    if (userData === undefined) {
      return history.push('/')
    }
    const type = userData.isAdmin ? 'Admin' : 'User'
    return (
      <>
        <div className="user-info">
          <p className="info">{userData.username}</p>
          <p className="info">{userData.email}</p>
          <p className="info-type">{type}</p>
        </div>
        <div className="profile-interface">
          <a href onClick={showModal} className="edit-btn-profile"><span className="material-icons icons">edit</span></a>
          <a href onClick={deleteProfileHandler} className="delete-btn-profile"><span className="material-icons">delete_outline</span></a>
        </div>
        <PageTitle title="Profiles:" />
      </>
    )
  }
  return (
    <div className="user-page">
      { !userState.users.length ? <p>Not found</p> : renderProfiles() }
      <div style={{ overflowY: mappedUsers.length > 8 ? 'scroll' : 'hidden' }} className="cards-block">
        {mappedUsers}
      </div>
      { !modals.profileModal ? <div /> : profileModalRender() }
    </div>
  )
}

export { User }
