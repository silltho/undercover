import {
  GET_USERINFO
} from 'services/constants'

const initialState = {}

function usersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERINFO:
      console.log('Userinfo:', action.data)
      return { ...state, currentUser: action.data }
    default:
      return state
  }
}

export default usersReducer
