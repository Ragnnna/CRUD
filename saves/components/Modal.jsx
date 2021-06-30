import React, { useContext, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../App'
import { CLOSE_MODAL } from '../store/reducers/modalReduser'
import './components.css'

const Modal = ({ display }) => {

    const dispatch = useDispatch()
    const history = useHistory()
    const radioRefMale = useRef(null)
    const radioRefFemale = useRef(null)
    const context = useContext(UserContext)
    const [ user, setUser ] = useState({
        username: '',
        city: '',
        birthdate: '',
        gender: 'male',
        main: false
    })

    const clearState = () => {
        return setUser({
            username: '',
            city: '',
            birthdate: '',
            gender: '',
            main: false
        })
    }

    useEffect(() => {
        const profile = JSON.parse(localStorage.getItem('currentProfile'))
        if(profile.gender === 'male'){
            return radioRefMale.current.checked = true
        }else{
            radioRefFemale.current.checked = true
        }
        if(context.typeModal === 'update'){
            return setUser(state => ({...state, username: profile.username, city: profile.city, birthdate: profile.birthdate, gender: 'male'}))
        }
    }, [])


    const changeHandler = (e) => {
        const name = e.target.name
        const elementId = e.target.id
        const value = e.target.value
        if(elementId === 'male'){
            return setUser(state => ({...state, gender: 'male'}))
        }else if(elementId === 'female'){
            return setUser(state => ({...state, gender: 'female'}))
        }
        setUser(state => ({...state, [name]: value}))
    }

    const closeModal = () => {
        dispatch({ type: CLOSE_MODAL, payload: { type: user, name: ''} })
    }

    const createProfileTriger = async() => {
        if(!user.gender || !user.birthdate || !user.username || !user.city){
            history.push('/')
            closeModal()
            return
        }
        const current = await context.getCurrentAccount(context.token)
        await context.createProfile({...current['user'], gender: user.gender, birthdate: user.birthdate, main: user.main, username: user.username, city: user.city, token: context.token})
        await context.getUsers()
        closeModal()
        return clearState()
    }

    const changeTriger = async() => {
        if(context.typeModal === "update"){
            if(!user.gender || !user.birthdate || !user.username || !user.city){
                history.push('/')
                context.closeModal()
                return
            }
            await context.updateUser({gender: user.gender, birthdate: user.birthdate, username: user.username, city: user.city}, context.currentUser._id)
            history.push('/')
            context.closeModal()
        }
        return await createProfileTriger()
    }

    
    return (
        <div className="modal-background" style={{'display': display ? 'block' : 'none'}}>
           <div className="modal-block">
                <form className="form">
                    <div className="form-block">
                        <label htmlFor="">
                            <span className="form-element">name:</span>
                            <input onChange={changeHandler} value={user.username} type="text" name="username" className="input-text form-element"/>
                        </label>
                    </div>
                    <div className="form-block">
                        <label htmlFor="">
                        <span >gender:</span>
                            <div onChange={changeHandler} className="input-text" className="radio-btns">
                                <input ref={radioRefMale} value={user.gender} id="male" type="radio" name="gender"/>male
                                <input ref={radioRefFemale} value={user.gender}  type="radio" id="female" name="gender"/>female
                            </div>
                        </label>
                    </div>
                    <div className="form-block">
                        <label htmlFor="">
                        <span className="form-element">birthdate:</span>
                            <input onChange={changeHandler} value={user.birthdate} type="text" name="birthdate" className="input-text form-element"/>
                        </label>
                    </div>
                    <div className="form-block">
                        <label htmlFor="">
                        <span className="form-element">city:</span>
                            <input onChange={changeHandler} value={user.city} type="text" name="city" className="input-text form-element"/>
                        </label>
                    </div>
                    <div className="interface-modal">
                        <a onClick={changeTriger}><span className="material-icons btn">done</span></a>
                        <a onClick={closeModal}><span className="material-icons btn">close</span></a>
                    </div>
                </form>
           </div>
        </div>
    )
}

export default Modal