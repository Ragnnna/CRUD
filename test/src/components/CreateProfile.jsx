import React, { useContext } from 'react'
import { UserContext } from '../App'
import './components.css'
import Modal from './Modal'

const CreateProfile = () => {

    const context = useContext(UserContext)

    const ShowModal = () => {
        context.showModal()
        context.setTypeModal('create')
    }

    const m = () => {
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
            { context.modal ? m() : '' }
        </div>
        </>
    )
}

export default CreateProfile