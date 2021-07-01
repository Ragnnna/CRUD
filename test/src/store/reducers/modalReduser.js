import { CLOSE_MODAL, SHOW_MODAL } from '../environment'

const initialState = {
  modal: false,
  profileModal: false,
  nameModal: '',
}

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      if (action.payload.type === 'profile') {
        return { ...state, profileModal: true, nameModal: action.payload.name }
      }
      return { ...state, modal: true, nameModal: action.payload.name }
    case CLOSE_MODAL:
      if (action.payload.type === 'profile') {
        return { ...state, profileModal: false }
      }
      return { ...state, modal: false }
    default:
      return state
  }
}

export default modalReducer
