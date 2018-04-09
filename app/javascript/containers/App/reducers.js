import { fromJS, Map } from 'immutable'
import {
  CREATE_GAME_SUCCESS,
  GAME_UPDATED,
  GAME_DELETE,
  LEAVE_GAME_SUCCESS,
  PLAYER_UPDATED,
  INFORMATION_UPDATED,
  RESET_GAME
} from 'services/constants'

const initialState = fromJS({
  Game: {},
  Player: {},
  RoundInformation: {}
})

function appReducer(state = initialState, action) {
  switch (action.type) {
    case RESET_GAME: {
      return initialState
    }
    case GAME_UPDATED:
    case CREATE_GAME_SUCCESS: {
      const game = state.get('Game', Map())
      const data = fromJS(action.data)
      const newState = state.setIn(['Game'], game.merge(data))
      if (state.hasIn(['Player', 'id'])) {
        const playerId = state.getIn(['Player', 'id'])
        const playerIndex = data.get('players')
          .findIndex((player) => player.get('id') === playerId)
        const newPlayerProps = data.getIn(['players', playerIndex])
        return newState.setIn(['Player'], state.get('Player').merge(newPlayerProps))
      }
      return newState
    }
    case LEAVE_GAME_SUCCESS:
    case GAME_DELETE: {
      return state.set('Game', fromJS({}))
    }
    case PLAYER_UPDATED: {
      const player = fromJS(action.data)
      return state.set('Player', player)
    }
    case INFORMATION_UPDATED: {
      return state.set('RoundInformation', fromJS(action.data))
    }
    default:
      return state
  }
}

export default appReducer
