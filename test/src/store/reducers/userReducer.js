import { FETCH_USER, FETCH_USERS } from '../environment'

const initialState = {
  user: {},
  users: [],
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return { ...state, users: action.payload }
    case FETCH_USER:
      return { ...state, user: action.payload }
    default:
      return state
  }
}

export default userReducer
