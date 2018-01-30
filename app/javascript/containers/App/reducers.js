import { fromJS } from 'immutable'
import {
  GAME_CREATED,
  JOIN_GAME,
  LEAVE_GAME
} from 'services/constants'

const initialState = fromJS({ App: {} })

function appReducer(state = initialState, action) {
  switch (action.type) {
    case GAME_CREATED:
    case JOIN_GAME: {
      return state.setIn(['App', 'currentGameId'], action.data.id)
    }
	  case LEAVE_GAME: {
		  return state.setIn(['App', 'currentGameId'], null)
	  }
    default:
      return state
  }
}

export default appReducer
