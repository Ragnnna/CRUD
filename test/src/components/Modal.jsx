import React, {
  useContext, useEffect, useState,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../App'
import {
  createProfile, fetchUser, fetchUsers, updateProfile,
} from '../store/actions/asyncActions'
import { CLOSE_MODAL } from '../store/environment'
import './components.css'

const Modal = ({ display }) => {
  const modals = useSelector((state) => state.modal)
  const dispatch = useDispatch()
  const history = useHistory()
  const context = useContext(UserContext)
  const [user, setUser] = useState({
    username: '',
    city: '',
    birthdate: '',
    gender: '',
    main: false,
  })

  const clearState = () => (
    setUser({
      username: '',
      city: '',
      birthdate: '',
      gender: '',
      main: false,
    })
  )

  useEffect(() => {
    const profile = context.currentUser
    if (modals.nameModal === 'update') {
      return setUser((state) => ({
        ...state,
        username: profile.username,
        city: profile.city,
        birthdate: profile.birthdate,
        gender: profile.gender,
      }))
    }
  }, [])

  const changeHandler = (e) => {
    const { name, value } = e.target
    const elementId = e.target.id
    if (elementId === 'male') {
      return setUser((state) => ({ ...state, gender: 'male' }))
    } else if (elementId === 'female') {
      return setUser((state) => ({ ...state, gender: 'female' }))
    }
    return setUser((state) => ({ ...state, [name]: value }))
  }

  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL, payload: { type: user, name: '' } })
  }

  const createProfileTriger = async () => {
    if (!user.gender || !user.birthdate || !user.username || !user.city) {
      history.push('/')
      closeModal()
      return
    }
    const current = await dispatch(fetchUser(context.token))
      .then((data) => (
        data.user
      ))
    dispatch(createProfile({
      ...current,
      gender: user.gender,
      birthdate: user.birthdate,
      main: user.main,
      username: user.username,
      city: user.city,
      token: context.token,
    }))
    await dispatch(fetchUsers())
    closeModal()
    clearState()
  }

  const changeTriger = async () => {
    if (modals.nameModal === 'update') {
      if (!user.gender || !user.birthdate || !user.username || !user.city) {
        history.push('/')
        closeModal()
        return
      }
      await dispatch(updateProfile({
        gender: user.gender, birthdate: user.birthdate, username: user.username, city: user.city,
      }, context.currentUser._id))
      closeModal()
      await dispatch(fetchUsers())
      return history.push('/')
    }
    await createProfileTriger()
  }

  return (
    <div className="modal-background" style={{ display: display ? 'block' : 'none' }}>
      <div className="modal-block">
        <form className="form">
          <div className="form-block">
            <label htmlFor="input-text-1">
              <span className="form-element">name:</span>
              <input onChange={changeHandler} value={user.username} type="text" name="username" className="input-text form-element" id="input-text-1" />
            </label>
          </div>
          <div className="form-block">
            <label htmlFor="male-radio">
              <span>gender:</span>
              <div id="male-radio" className="radio-btns">
                <input onChange={changeHandler} checked={user.gender === 'male'} value={user.gender} id="male" type="radio" name="gender" />
                male
                <input onChange={changeHandler} checked={user.gender === 'female'} value={user.gender} type="radio" id="female" name="gender" />
                female
              </div>
            </label>
          </div>
          <div className="form-block">
            <label htmlFor="input-text-2">
              <span className="form-element">birthdate:</span>
              <input onChange={changeHandler} value={user.birthdate} type="text" name="birthdate" className="input-text form-element" id="input-text-2" />
            </label>
          </div>
          <div className="form-block">
            <label htmlFor="3">
              <span className="form-element">city:</span>
              <input onChange={changeHandler} value={user.city} type="text" name="city" className="input-text form-element" id="input-text-3" />
            </label>
          </div>
          <div className="interface-modal">
            <a href onClick={changeTriger}><span className="material-icons btn">done</span></a>
            <a href onClick={closeModal}><span className="material-icons btn">close</span></a>
          </div>
        </form>
      </div>
    </div>
  )
}

export { Modal }
