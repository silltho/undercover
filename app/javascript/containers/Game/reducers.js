import { Map, fromJS } from 'immutable'
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
      const game = state.get('Game', Map())
      return state.setIn(['Game'], game.merge(fromJS(action.data)))
    }
    case PARTY_MEMBERS: {
      return state.setIn(['Game', 'party_members'], fromJS(action.data))
    }
    default:
      return state
  }
}

export default gameReducer
