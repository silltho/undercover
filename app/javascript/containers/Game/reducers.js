import { Map, fromJS } from 'immutable'
import {
  PLAYER_INITIALIZED_GAME
} from 'services/constants'

const initialState = fromJS({ Game: {} })

function gameReducer(state = initialState, action) {
  switch (action.type) {
    case PLAYER_INITIALIZED_GAME: {
      const game = state.get('Game', Map())
      return state.setIn(['Game'], game.merge(fromJS(action.data)))
    }
    default:
      return state
  }
}

export default gameReducer
