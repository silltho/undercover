import { fromJS } from 'immutable'
import history from 'services/history'
import {
  PLAYER_INITIALIZED_GAME,
  PARTY_MEMBERS
} from 'services/constants'

const initialState = fromJS({ Game: {} })

function gameReducer(state = initialState, action) {
  switch (action.type) {
    case PLAYER_INITIALIZED_GAME: {
	    history.push('/game')
      return state.setIn(['Game'], fromJS(action.data))
    }
    case PARTY_MEMBERS: {
	    return state.setIn(['Game', 'party_members'], fromJS(action.data))
    }
    default:
      return state
  }
}

export default gameReducer
