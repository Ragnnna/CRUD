import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../App'
import { Modal } from './Modal'
import './components.css'
import { deleteProfile, fetchUser } from '../store/actions/asyncActions'
import { SHOW_MODAL } from '../store/environment'

const ProfileCard = ({ user }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const modals = useSelector((state) => state.modal)
  const context = useContext(UserContext)
  const ShowModal = async () => {
    dispatch({ type: SHOW_MODAL, payload: { type: 'user', name: 'update' } })
    context.setCurrentUser(user)

    dispatch(fetchUser(user._id))
  }

  const modalRender = () => (
    <Modal
      id={user._id}
      display={modals.modal}
    />
  )

  const deleteProfileHandler = () => {
    if (user._id === context.token) {
      dispatch(deleteProfile(user._id))
      localStorage.removeItem('token')
      context.setToggler((state) => !state)
      return history.push('/login')
    }
    return dispatch(deleteProfile(user._id))
  }

  return (
    <>
      <div className="profile-card">
        <div className="info">
          <p>{ user.username ? user.username : '-' }</p>
          <p>{user.gender ? user.gender : '-'}</p>
          <p>{user.birthdate ? user.birthdate : '-'}</p>
          <p>{user.city ? user.city : '-'}</p>
        </div>
        <div className="interface-card">
          <a href onClick={ShowModal} className="edit-btn">
            edit
            <span className="material-icons icons">edit</span>
          </a>
          <a href onClick={deleteProfileHandler} className="delete-btn">
            delete
            <span className="material-icons">delete_outline</span>
          </a>
        </div>
      </div>
      <div>
        { modals.modal ? modalRender() : '' }
      </div>
    </>
  )
}

export { ProfileCard };
