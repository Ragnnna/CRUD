import { FETCH_USER, FETCH_USERS } from '../reducers/userReducer'

export const fetchUsers = () => (
  async (dispatch) => {
    const response = await fetch('http://localhost:4000/users')
    const data = await response.json()
    return dispatch({ type: FETCH_USERS, payload: data })
  }
)

export const fetchUser = (id) => (
  async (dispatch) => {
    const response = await fetch(`http://localhost:4000/user/${id}`)
    const data = await response.json()
    dispatch({ type: FETCH_USER, payload: data })
    return data
  }
)

export const updateProfile = (data, id) => (
  async (dispatch) => {
    await fetch(`http://localhost:4000/update/${id}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    await dispatch(fetchUsers())
  }
)

export const createProfile = (profile) => (
  async (dispatch) => {
    const response = await fetch('http://localhost:4000/create', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profile),
    })
    const data = await response.json()
    await dispatch(fetchUsers())
    if (data.message) {
      return data.message
    }
  }
)

export const deleteProfile = (id) => (
  async (dispatch, getState) => {
    await fetch(`http://localhost:4000/user/${id}`, { method: 'PUT' })
    if (id !== getState().user._id) {
      await dispatch(fetchUsers())
    } else {
      return localStorage.removeItem('token')
    }
  }
)
