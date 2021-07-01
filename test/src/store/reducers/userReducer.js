export const FETCH_USERS = 'FETCH_USERS'
export const FETCH_USER = 'FETCH_USER'

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
