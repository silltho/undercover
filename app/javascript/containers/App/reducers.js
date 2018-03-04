import { fromJS, Map } from 'immutable'
import {
  CREATE_GAME_SUCCESS,
  GAME_UPDATED,
  GAME_DELETE,
  LEAVE_GAME_SUCCESS
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
    default:
      return state
  }
}

export default appReducer
