import { fromJS } from 'immutable'
import {
  JOIN_GAME,
  LEAVE_GAME
} from 'services/constants'

const initialState = fromJS({ Home: {} })

function lobbyReducer(state = initialState, action) {
  switch (action.type) {
    case JOIN_GAME: {
      return state.setIn(['Lobby', 'gameId'], action.data.id)
    }
    case LEAVE_GAME: {
      return state.setIn(['Lobby', 'gameId'], null)
    }
    default:
      return state
  }
}

export default lobbyReducer
