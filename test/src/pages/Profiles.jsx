import React, { useContext, useEffect, useState } from 'react'
import PageTitle from '../components/PageTitle'
import ProfileCard from '../components/ProfileCard'
import CreateProfile from '../components/CreateProfile'
import './pages.css'
import { UserContext } from '../App'

const Profiles = () => {

    const context = useContext(UserContext)
    const [ isAdmin, setIsAdmin ] = useState('')


    useEffect(() => {
        const fetchUser = async() => {
            const user = (await context.getCurrentAccount(context.token)).user
            await context.getUsers()
            setIsAdmin(user.isAdmin)
        }
        fetchUser()
    }, [])

    useEffect(() => {
        const fetchUsers = async() => await context.getUsers()
        fetchUsers()
    }, [])
    const users = isAdmin ? context.users.map(el => <ProfileCard key={el._id} user={el}/>) 
    : context.users.filter(el => context.token === el.token).map(el => <ProfileCard key={el._id} user={el}/>)  

    return (
        <div className="users-page">
            <PageTitle title="Profiles:" />
            <div style={{'overflowY': users.length > 8 ? 'scroll' : 'hidden'}} className="cards-block">
                {users}
                <CreateProfile />
            </div>
        </div>
    )
}

export default Profiles