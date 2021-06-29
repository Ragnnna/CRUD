import React, { useContext, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../App'
import './components.css'


const ProfileModal = () => {

    const history = useHistory()
    const id = history.location.pathname.slice(6, history.location.pathname.length)
    const [ user, setUser ] = useState({
        username: '',
        email: '',
        isAdmin: ''
    })
    const radioRefUser = useRef(null)
    const radioRefAdmin = useRef(null)
    const context = useContext(UserContext)

    useEffect(() => {
        const fetchUsers = async() => {
            return await context.getUsers()
        }
        fetchUsers()
        context.getUser(id)
        const profile = JSON.parse(localStorage.getItem('currentProfile'))
        if(profile.isAdmin){
            radioRefAdmin.current.checked = true
        }else{
            radioRefUser.current.checked = true
        }
        return setUser(state => ({...state, username: profile.username, email: profile.email, isAdmin: profile.isAdmin}))
    }, [])


    const changeHandler = (e) => {
        const name = e.target.name
        const elementId = e.target.id
        const value = e.target.value
        if(elementId === 'user'){
            return setUser(state => ({...state, isAdmin: false}))
        }else if(elementId === 'admin'){
            return setUser(state => ({...state, isAdmin: true}))
        }
        setUser(state => ({...state, [name]: value}))
    }
    
    const updateUser = async() => {
        context.closeModal('profile')
        return await context.updateUser({ username: user.username, email: user.email, isAdmin: user.isAdmin }, id )
    }
    return (
        <div className="profile-modal-area">
            <div className="profile-modal-block">
                <form className="form">
                <div className="form-block">
                        <label htmlFor="">
                        <span className="form-element">user name:</span>
                            <input onChange={changeHandler} value={user.username} type="text" name="username" className="input-text form-element"/>
                        </label>
                    </div>
                    <div className="form-block">
                        <label htmlFor="">
                        <span className="form-element">email:</span>
                            <input onChange={changeHandler} value={user.email} type="text" name="email" className="input-text form-element"/>
                        </label>
                    </div>
                    <div className="form-block">
                        <label htmlFor="">
                        <span >role:</span>
                            <div onChange={changeHandler} className="input-text" className="radio-btns-profile">
                                <div className="radio-btn"><input ref={radioRefUser} value={user.isAdmin} id="user" type="radio" name="gender"/>user</div>
                                <div className="radio-btn"><input ref={radioRefAdmin} value={user.isAdmin}  type="radio" id="admin" name="gender"/>admin</div>
                            </div>
                        </label>
                    </div>
                    <div className="interface-modal">
                        <a onClick={updateUser}><span className="material-icons btn">done</span></a>
                        <a onClick={() => context.closeModal('profile')}><span className="material-icons btn">close</span></a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProfileModal