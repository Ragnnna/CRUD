import React, { useContext } from 'react'
import { UserContext } from '../App'
import PageTitle from '../components/PageTitle'
import UserCard from '../components/UserCard'
import './pages.css'

const Users = () => {
    
    const context = useContext(UserContext)

    const users = context.users
    

    const usersArray = 
    users
    .filter((v,i,a)=>a.findIndex(t=>(t.email === v.email))===i)
    .map(el => <UserCard key={el._id} username={el.username} email={el.email} profilesOptions={{users, token: el.token}} id={el._id}/>)

    return (
        <div className="users-page">
            <PageTitle title="Users:" />
            <div style={{'overflowY': users.length > 12 ? 'scroll' : 'hidden'}} className="users-cards-block">
                {usersArray}
            </div>
        </div>
    )
}

export default Users