import React, { useState } from 'react'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Main from './views/Main'
import Auth from './views/Auth'

export const UserContext = React.createContext()

const App = () => {
  const [ user, setUser ]= useState('')
  const [ currentUser, setCurrentUser ] = useState('')
  const [ profileModal, setProfileModal ] = useState(false)
  const [ typeModal, setTypeModal ] = useState('')
  const [ users, setUsers ] = useState([])
  const [ errorRegister, setErrorRegister ] = useState('')
  const [ modal, setModal ] = useState(false)
  const [ , setToggler ] = useState(false)

  const showModal = (type) => {
    if(type === 'profile'){
      return setProfileModal(true)
    }
    return setModal(true)
  }
  const closeModal = (type) => {
    if(type === 'profile'){
      return setProfileModal(false)
    }
    setModal(false)
  }

  const getCurrentAccount = async(id) => {
    const response = await fetch(`http://localhost:4000/user/${id}`)
    const data = await response.json()
    setUser(data)
    return data
  }
  
  const token = localStorage.getItem('token')

  const getUser = async(id) => {
    const user = users.find(el => el._id === id)
    localStorage.setItem('currentProfile', JSON.stringify(user))
  }
  
  const updateUser = async(data, id) => {
    await fetch(`http://localhost:4000/update/${id}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    await getUsers()
  }

  const clearUser = () => {
    localStorage.setItem('token', 'none')
    setToggler(state => state = !state)
  }

  const getUsers = async() => {
      const response = await fetch('http://localhost:4000/users')
      const data = await response.json()
      setUsers(data)
  }

  const deleteUser = async(id) => {
    await fetch(`http://localhost:4000/user/${id}`, { method: 'PUT'} )
    if(id !== user._id){
      return await getUsers()
    }else{
      return clearUser()
    }
  }
  
  const createProfile = async(profile) => {
    const response = await fetch('http://localhost:4000/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(profile)
            })
        const data = await response.json()
        if(data.message){
            return
        }
  }

  const setToken = (token) => {
    localStorage.setItem('token', token)
    setToggler(state => state = !state)
  }
  

  return (
    <BrowserRouter>
    <UserContext.Provider value={{
      getCurrentAccount,
      token,
      setCurrentUser,
      currentUser,
      setToken, 
      clearUser, 
      showModal, 
      closeModal, 
      modal,
      profileModal, 
      createProfile, 
      user, 
      setErrorRegister, 
      errorRegister, 
      users,
      getUser,
      getUsers,
      deleteUser,
      updateUser,
      setTypeModal,
      typeModal}}>
      <div className="App">
        {token === 'none' ? <Auth/> : <Main/>}
      </div>
    </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
