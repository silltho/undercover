import {
  GET_USERINFO,
  CREATE_GAME,
  GET_OPEN_GAMES
} from './constants'

const initialState = {}

function usersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERINFO:
      console.log('Userinfo:', action.data)
      return { ...state, currentUser: action.data }
    case CREATE_GAME:
      console.log('new Game:', action.data)
      return { ...state, games: [...state.games, action.data] }
    case GET_OPEN_GAMES:
      console.log('get Open Games:', action.data)
      return { ...state, games: action.data.games }
    default:
      return state
  }
}

export default usersReducer
