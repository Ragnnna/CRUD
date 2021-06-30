export const SHOW_MODAL = 'SHOW_MODAL'
export const CLOSE_MODAL = 'CLOSE_MODAL'


const initialState = {
    modal: false,
    profileModal: false,
    nameModal: '',
}

const modalReducer = (state = initialState, action) => {
    
    switch(action.type){
        case SHOW_MODAL:
            console.log(state)
            if(action.payload.type === 'profile'){
                return {...state, profileModal: true, nameModal: action.payload.name}
            }
            console.log(action.payload)
            return {...state, modal: true, nameModal: action.payload.name}
        case CLOSE_MODAL:
            if(action.payload.type === 'profile'){
                console.log('here')
                return {...state, profileModal: false}
              }
            return {...state, modal: false}
        default:
            return state
    }

}

export default modalReducer