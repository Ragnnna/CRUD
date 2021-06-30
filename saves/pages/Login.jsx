import './pages.css'
import '../components/components.css'
import { useContext, useState } from 'react'
import { UserContext } from '../App'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../store/actions/asyncActions'

const Login = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const context = useContext(UserContext)
    const [ login, setLogin ] = useState({
        email: '',
        password: ''
    })

    const changeHandler = (e) => {
        const name = e.target.name
        const value = e.target.value

        setLogin(state => ({...state, [name]: value}))
    }

    const loginHandler = async() => {
        const response = await fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(login)
        })
        const data = await response.json()
        if(data.message){
            return
        }
        context.setToken(data.user._id)
        console.log(await dispatch(fetchUsers()))
        history.push('/')
    }

    return(
        <div className="register-block">
            <h1 className="auth-title">Sign In</h1>
            <form className="register-form">
                <div className="form-control">
                    <label htmlFor="email">
                        <span className="auth-input-title">Email</span>
                        <input onChange={changeHandler} value={login.email} className="form-element input-text input-style" type="text" name="email" id="email" />
                    </label>
                </div>
                <div className="form-control">
                    <label htmlFor="password">
                        <span className="auth-input-title">Password</span>
                        <input onChange={changeHandler} value={login.password} className="form-element input-text input-style" type="password" name="password" id="password" />
                    </label>
                </div>
                <div className="form-control submit-control">
                    <a className="btn-submit" onClick={loginHandler}>Sign In</a>
                </div>
            </form>
        </div>
    )

}

export default Login