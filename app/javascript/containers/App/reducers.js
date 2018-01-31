import { fromJS } from 'immutable'
import {
	CREATE_GAME_SUCCESS,
  JOIN_GAME_SUCCESS,
  LEAVE_GAME
} from 'services/constants'

const initialState = fromJS({ App: {} })

function appReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_GAME_SUCCESS:
    case JOIN_GAME_SUCCESS: {
      return state.setIn(['App', 'currentGameId'], action.data)
    }
	  case LEAVE_GAME: {
		  return state.setIn(['App', 'currentGameId'], null)
	  }
    default:
      return state
  }
}

export default appReducer
