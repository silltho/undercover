import { fromJS } from 'immutable'
import {
  GET_USERINFO,
  GET_OPEN_GAMES
} from './constants'

const initialState = fromJS({})

function usersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERINFO:
      console.log('Userinfo:', action.data)
      return state
        .set('currentUser', action.data)
    case GET_OPEN_GAMES:
      console.log('open Games:', action.data.games)
      return state.setIn(['Dashboard', 'openGames'], fromJS(action.data.games))
    default:
      return state
  }
}

export default usersReducer
