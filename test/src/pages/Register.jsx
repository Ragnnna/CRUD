import React, { useContext, useRef, useState } from 'react'
import './pages.css'
import '../components/components.css'
import { UserContext } from '../App'

const Register = () => {
  const context = useContext(UserContext)
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    isAdmin: false,
    dateRegister: '',
    city: '',
    birthdate: '',
    main: true,
    gender: 'male',
    token: 'none',
  })

  const [checkboxToggle, setCheckboxToggle] = useState(true)
  const checkRef = useRef(null)

  const handleCheckbox = () => {
    setCheckboxToggle((state) => !state)
    checkRef.current.checked = checkboxToggle
    setUser((state) => ({ ...state, isAdmin: checkRef.current.checked }))
  }

  const changeHandler = (e) => {
    const { name, value } = e.target

    setUser((state) => ({ ...state, [name]: value }))
  }

  const RegisterHandler = async () => {
    const response = await fetch('http://localhost:4000/create', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    const data = await response.json()
    if (data.message) {
      return context.setErrorRegister('Некорректные данные. Повторите попытку!')
    }
    context.setErrorRegister('', context.setToggler)
    context.setToken(data._id)
  }

  return (
    <div className="register-block">
      <h1 className="auth-title">Create your account</h1>
      <form className="register-form">
        <div className="form-control">
          <label htmlFor="username">
            <span className="auth-input-title">Username</span>
            <input
              onChange={changeHandler}
              value={user.username}
              className="form-element input-text input-style"
              type="text"
              name="username"
              id="username"
            />
          </label>
        </div>
        <div className="form-control">
          <label htmlFor="email">
            <span className="auth-input-title">Email</span>
            <input
              onChange={changeHandler}
              value={user.email}
              className="form-element input-text input-style"
              type="text"
              name="email"
              id="email"
            />
          </label>
        </div>
        <div className="form-control">
          <label htmlFor="password">
            <span className="auth-input-title">Password</span>
            <input onChange={changeHandler} className="form-element input-text input-style" type="password" name="password" id="password" />
          </label>
        </div>
        <div className="form-control">
          <label onClick={handleCheckbox} htmlFor="admin" className="custom-checkbox" style={{ background: !checkboxToggle ? 'black' : '#E5E5E5' }}>
            <input
              ref={checkRef}
              value={user.isAdmin}
              className="checkbox-register"
              type="checkbox"
              name="isAdmin"
              id="admin"
            />
          </label>
          <span onClick={handleCheckbox}>isAdmin</span>
        </div>
        <div className="form-control submit-control">
          <a href onClick={RegisterHandler} className="btn-submit">Sign Up</a>
        </div>
        <p className="auth-error">{context.errorRegister}</p>
      </form>
    </div>
  )
}

export { Register }
