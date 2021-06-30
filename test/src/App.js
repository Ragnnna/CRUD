import React, { useState } from 'react'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Main from './views/Main'
import Auth from './views/Auth'

export const UserContext = React.createContext()

const App = () => {
  const [ user, setUser ]= useState('')
  const [ currentUser, setCurrentUser ] = useState('')
  const [ errorRegister, setErrorRegister ] = useState('')
  const [ , setToggler ] = useState(false)


  const getCurrentAccount = async(id) => {
    const response = await fetch(`http://localhost:4000/user/${id}`)
    const data = await response.json()
    setUser(data)
    return data
  }
  
  const token = localStorage.getItem('token')

  const clearUser = () => {
    localStorage.setItem('token', 'none')
    setToggler(state => state = !state)
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
      user, 
      setErrorRegister, 
      errorRegister
      }}>
      <div className="App">
        {token === 'none' ? <Auth/> : <Main/>}
      </div>
    </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
