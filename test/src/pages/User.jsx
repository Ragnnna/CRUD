import React, { useEffect } from 'react'
import PageTitle from '../components/PageTitle'
import ProfileModal from '../components/ProfileModal'
import ProfileCard from '../components/ProfileCard'
import { useDispatch, useSelector } from 'react-redux'
import './pages.css'
import { SHOW_MODAL } from '../store/reducers/modalReduser'
import { fetchUsers } from '../store/actions/asyncActions'

const User = ({match}) => {

    const modals = useSelector(state => state.modal)
    const userState = useSelector(state => state.user)
    const dispatch = useDispatch()
    const id = match.url.slice(6, match.url.length)

    const user = userState.users.filter(el => el._id === id)
    useEffect(() => {
        dispatch(fetchUsers())
    }, [])

    const profileModalRender = () => {
        return <ProfileModal currentUser={user}/>
    }

    const showModal = () => {
        dispatch({ type: SHOW_MODAL, payload: {type: 'profile', name: ''} })
    }

    const mappedUsers = userState.users.filter(el => id === el.token && el.main === false ).map(el => <ProfileCard key={el._id} user={el}/>)

    const renderProfiles = () => {
        const User = userState.users.find(el => el._id === id)
        const type = User.isAdmin ? 'Admin' : 'User'
        return (
            <>
            <div className="user-info">
                <p className="info">{User.username}</p>
                <p className="info">{User.email}</p>
                <p className="info-type">{type}</p>
            </div>
            <div className="profile-interface">
                <a href onClick={showModal} className="edit-btn-profile"><span className="material-icons icons">edit</span></a>
                <a href className="delete-btn-profile"><span className="material-icons">delete_outline</span></a>
            </div>
            <PageTitle title='Profiles:'/>
            </>
        )
    }
    



    return (
        <div className="user-page">
            { !userState.users.length ? <p>Not found</p> : renderProfiles() }
            <div style={{'overflowY': mappedUsers.length > 8 ? 'scroll' : 'hidden'}} className="cards-block">
                {mappedUsers}
            </div>
            { !modals.profileModal ? <div></div> : profileModalRender() }
        </div>
    )
}

export default User