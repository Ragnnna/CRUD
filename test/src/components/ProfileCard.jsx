import React, { useContext } from 'react'
import './components.css'
import Modal from '../components/Modal'
import { UserContext } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { SHOW_MODAL } from '../store/reducers/modalReduser'
import { deleteProfile, fetchUser } from '../store/actions/asyncActions'
import { useHistory } from 'react-router-dom'

const ProfileCard = ({ user }) => {
    
    const history = useHistory()
    const dispatch = useDispatch()
    const modals = useSelector(state => state.modal)
    const context = useContext(UserContext)
    const ShowModal = async() => {
        dispatch({ type: SHOW_MODAL, payload: { type: 'user', name: "update"} })
        context.setCurrentUser(user)
        dispatch(fetchUser(user._id))
    }

    const modalRender = () => {
        return <Modal
        id={user._id}
        display={modals.modal}
        />
    }

    const deleteProfileHandler = () => {
        if(user._id === context.token){
            dispatch(deleteProfile(user._id))
            localStorage.setItem('token', 'none')
            context.setToggler(state => !state)
            return history.push('/login')
        }
        dispatch(deleteProfile(user._id))
    }
    
    return (
        <>
        <div className="profile-card">
            <div className="info">
                <p>{user.username ? user.username : '-'}</p>
                <p>{user.gender ? user.gender : '-'}</p>
                <p>{user.birthdate ? user.birthdate : '-'}</p>
                <p>{user.city ? user.city : '-'}</p>
            </div>
            <div className="interface-card">
                <a href onClick={ShowModal} className="edit-btn">edit<span className="material-icons icons">edit</span></a>
                <a href onClick={deleteProfileHandler} className="delete-btn">delete<span className="material-icons">delete_outline</span></a>
            </div>
        </div>
        <div>
            { modals.modal ? modalRender() : '' }
        </div>
        </>
    )
}

export default ProfileCard