import { FETCH_USER, FETCH_USERS } from "../reducers/userReducer"

export const fetchUsers = () => {
    return async (dispatch) => {
        const response = await fetch('http://localhost:4000/users')
        const data = await response.json()
        console.log(data)
        //dispatch({ type: FETCH_USERS, payload: data })
    }
}

export const fetchUser = (id) => {
    return async (dispatch) => {
        const response = await fetch(`http://localhost:4000/update/${id}`)
        const data = await response.json()
        dispatch({ type: FETCH_USER, payload: data })
    }
}

export const updateUser = (data, id) => {
    return async (dispatch) => {
        await fetch(`http://localhost:4000/update/${id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        await dispatch(fetchUsers())
    }
}

export const createProfile = (profile) => {
    return async(dispatch) => {
        const response = await fetch('http://localhost:4000/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(profile)
            })
        const data = await response.json()
        await dispatch(fetchUsers())
        if(data.message){
            return
        }
    }
}
