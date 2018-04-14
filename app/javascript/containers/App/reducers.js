import { fromJS, Map } from 'immutable'
import {
  CREATE_GAME_SUCCESS,
  GAME_UPDATED,
  GAME_DELETE,
  LEAVE_GAME_SUCCESS,
  PLAYER_UPDATED,
  INFORMATION_UPDATED,
  RESET_GAME,
  PLAYER_INFORMED,
  HIDE_PLAYER_INFORMATIONS
} from 'services/constants'

const initialState = fromJS({
  Game: {},
  Player: {},
  RoundInformation: {},
  PlayerInformation: {
    informations: [{
      name: 'subjectname',
      role: 'Godfather',
      state: 'alive',
      changed_party: false
    }],
    show: true
  }
})

function appReducer(state = initialState, action) {
  switch (action.type) {
    case HIDE_PLAYER_INFORMATIONS: {
      return state.setIn(['PlayerInformation', 'show'], false)
    }
    case PLAYER_INFORMED: {
      const newInformation = fromJS(action.data)
      return state.setIn(['PlayerInformation', 'show'], true)
        .updateIn(['PlayerInformation', 'informations'], (informations) => informations.push(newInformation))
    }
    case RESET_GAME: {
      return initialState
    }
    case GAME_UPDATED:
    case CREATE_GAME_SUCCESS: {
      const game = state.get('Game', Map())
      const data = fromJS(action.data)
      return state.setIn(['Game'], game.merge(data))
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
