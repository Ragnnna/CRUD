import React from 'react'
import { Link } from 'react-router-dom'
import './components.css'

const UserCard = ({ username, email, profilesOptions, id }) => {

    const profilesLength = profilesOptions.users.filter(el => el.token === profilesOptions.token && el.username !== username).length
    const type = profilesLength > 1 ? 'profiles': profilesLength === 0 ? 'profiles' : 'profile'

    return (
        <div className="user-card">
            <Link to={"/user/" + id}><p className="title" >{ username }</p></Link>
            <p>{ email }</p>
            <p>{ profilesLength }  { type }</p>
        </div>
    )
}

export default UserCard