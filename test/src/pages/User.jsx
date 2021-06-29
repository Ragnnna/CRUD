import React, { useContext, useEffect } from 'react'
import { UserContext } from '../App'
import PageTitle from '../components/PageTitle'
import ProfileModal from '../components/ProfileModal'
import ProfileCard from '../components/ProfileCard'
import './pages.css'

const User = ({match}) => {

    const context = useContext(UserContext)
    const id = match.url.slice(6, match.url.length)

    useEffect(() => {
        const fetchUsers = async() => {
            return await context.getUsers()
        }
        fetchUsers()
    }, [])

    const profileModalRender = () => {
        return <ProfileModal />
    }

    
    const mappedUsers = context.users.filter(el => id === el.token && el.main === false ).map(el => <ProfileCard key={el._id} user={el}/>)

    const renderProfiles = () => {
        const user = context.users.find(el => el._id === id)
        const type = user.isAdmin ? 'Admin' : 'User'
        return (
            <>
            <div className="user-info">
                <p className="info">{user.username}</p>
                <p className="info">{user.email}</p>
                <p className="info-type">{type}</p>
            </div>
            <div className="profile-interface">
                <a onClick={() => context.showModal('profile')} className="edit-btn-profile"><span className="material-icons icons">edit</span></a>
                <a className="delete-btn-profile"><span className="material-icons">delete_outline</span></a>
            </div>
            <PageTitle title='Profiles:'/>
            </>
        )
    }
    



    return (
        <div className="user-page">
            { !context.users.length ? <p>Not found</p> : renderProfiles() }
            <div style={{'overflowY': mappedUsers.length > 8 ? 'scroll' : 'hidden'}} className="cards-block">
                {mappedUsers}
            </div>
            { !context.profileModal ? <div></div> : profileModalRender() }
        </div>
    )
}

export default User