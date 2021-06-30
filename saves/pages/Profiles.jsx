import React, { useContext, useEffect, useState } from 'react'
import PageTitle from '../components/PageTitle'
import ProfileCard from '../components/ProfileCard'
import CreateProfile from '../components/CreateProfile'
import './pages.css'
import { UserContext } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../store/actions/asyncActions'

const Profiles = () => {

    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const context = useContext(UserContext)
    const [ isAdmin, setIsAdmin ] = useState('')


    useEffect(() => {
        const fetchUser = async() => {
            dispatch(fetchUser(context.token))
            setIsAdmin(user.isAdmin)
        }
        fetchUser()
    }, [])

    useEffect(() => {
        dispatch(fetchUsers)
    }, [])
    const users = isAdmin ? user.users.map(el => <ProfileCard key={el._id} user={el}/>) 
    : user.users.filter(el => context.token === el.token).map(el => <ProfileCard key={el._id} user={el}/>)  

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