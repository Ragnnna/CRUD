import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UserContext } from '../App'
import { SHOW_MODAL } from '../store/reducers/modalReduser'
import './components.css'
import Modal from './Modal'

const CreateProfile = () => {

    const modals = useSelector(state => state.modal)
    const dispatch = useDispatch()
    const context = useContext(UserContext)

    const ShowModal = () => {
        dispatch({ type: SHOW_MODAL, payload: { type: '', name: 'create'} })
    }

    const renderModal = () => {
        return <Modal
        display={context.modal}
        closeModal={context.closeModal}
        updateUser={context.updateUser}
        />
    }
    

    return (
        <>
        <div className="create-profile">
            <div onClick={ShowModal} className="add-profile-btn">
                <p>+</p>
            </div>
            <div>
                <p className="title-add">Create new profile</p>
            </div>
        </div>
        <div>
            { modals.modal ? renderModal() : '' }
        </div>
        </>
    )
}

export default CreateProfile