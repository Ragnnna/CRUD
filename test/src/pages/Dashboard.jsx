import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PageTitle from '../components/PageTitle'
import { fetchUsers } from '../store/actions/asyncActions'
import './pages.css'

const Dashboard = () => {

    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchUsers())
    }, [])
    const users = () => {
        return user.users.filter(el => el.main === true ).length
    }
    
    const profiles = user.users.length

    return (
        <div>
            <PageTitle title="Dashboard:" />
            <div className="dashboard">
                <div className="users dash-block">
                    <p>Users:</p>
                    <p>{users()}</p>
                </div>
                <div className="profiles dash-block">
                    <p>Profiles:</p>
                    <p>{profiles}</p>
                </div>
                <div className="profiles-age dash-block">
                    <p>Profiles over 18 years old:</p>
                    <p>{profiles}</p>
                </div>
            </div>
        </div>
    )
}

export default Dashboard