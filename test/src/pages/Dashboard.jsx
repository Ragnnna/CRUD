import React, { useContext } from 'react'
import { UserContext } from '../App'
import PageTitle from '../components/PageTitle'
import './pages.css'

const Dashboard = () => {

    const context = useContext(UserContext)
    const users = () => {
        return context.users.filter(el => el.main === true ).length
    }
    
    const profiles = context.users.length

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
                    <p>16</p>
                </div>
            </div>
        </div>
    )
}

export default Dashboard