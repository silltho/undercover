import { fromJS, Map } from 'immutable'
import {
  CREATE_GAME_SUCCESS,
  GAME_UPDATED,
  GAME_DELETE,
  LEAVE_GAME_SUCCESS,
  PLAYER_INITIALIZED_GAME
} from 'services/constants'

const initialState = fromJS({
  Game: {},
  Player: {},
  RoundInformation: {}
})

function appReducer(state = initialState, action) {
  switch (action.type) {
    case GAME_UPDATED:
    case CREATE_GAME_SUCCESS: {
      const game = state.get('Game', Map())
      return state.setIn(['Game'], game.merge(fromJS(action.data)))
    }
    case LEAVE_GAME_SUCCESS:
    case GAME_DELETE: {
      return state.set('Game', fromJS({}))
    }
    case PLAYER_INITIALIZED_GAME: {
      const player = fromJS(action.data.current_player)
      const role = fromJS(action.data.role_details)
      return state
        .set('Player', player)
        .setIn(['Player', 'role'], role)
    }
    default:
      return state
  }
}

export default appReducer
