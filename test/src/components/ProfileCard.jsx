import React, { useContext } from 'react'
import './components.css'
import Modal from '../components/Modal'
import { UserContext } from '../App'
import { useHistory } from 'react-router-dom'

const ProfileCard = ({ user }) => {
    
    const context = useContext(UserContext)
    const history = useHistory()
    const ShowModal = async() => {
        context.showModal()
        context.setTypeModal('update')
        context.setCurrentUser(user)
        context.getUser(user._id)
    }

    const modalRender = () => {
        return <Modal
        id={user._id}
        display={context.modal}
        closeModal={context.closeModal}
        />
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
                <a  onClick={ShowModal} className="edit-btn">edit<span className="material-icons icons">edit</span></a>
                <a onClick={() => context.deleteUser(user._id)} className="delete-btn">delete<span className="material-icons">delete_outline</span></a>
            </div>
        </div>
        <div>
            { context.modal ? modalRender() : '' }
        </div>
        </>
    )
}

export default ProfileCard