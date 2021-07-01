import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UserContext } from '../App'
import { PageTitle } from '../components/PageTitle'
import { ProfileCard } from '../components/ProfileCard'
import { CreateProfile } from '../components/CreateProfile'
import './pages.css'
import { fetchUser, fetchUsers } from '../store/actions/asyncActions'

const Profiles = () => {
  const dispatch = useDispatch()
  const context = useContext(UserContext)
  const [isAdmin, setIsAdmin] = useState('')
  const usersState = useSelector((state) => state.user)

  useEffect(() => {
    const fetchUserData = async () => {
      await dispatch(fetchUsers())
      dispatch(fetchUser(context.token))
        .then((data) => {
          setIsAdmin(data.user.isAdmin);
        })
    }
    fetchUserData()
  }, [])

  const users = isAdmin ? usersState.users.map((el) => <ProfileCard key={el._id} user={el} />)
    : usersState.users
      .filter((el) => usersState.token === el.token)
      .map((el) => <ProfileCard key={el._id} user={el} />)

  return (
    <div className="users-page">
      <PageTitle title="Profiles:" />
      <div style={{ overflowY: users.length > 8 ? 'scroll' : 'hidden' }} className="cards-block">
        {usersState.users.length > 0 ? users : <div />}
        <CreateProfile />
      </div>
    </div>
  )
}

export { Profiles }
