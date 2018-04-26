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
  HIDE_PLAYER_INFORMATIONS,
  WAITING_FOR_OTHERS,
  GAME_ENDED
} from 'services/constants'

const initialState = fromJS({
  App: {
    showPlayerInformation: false,
    showWaitForOpponents: true
  },
  Game: {},
  Player: {},
  RoundInformation: {},
  PlayerInformation: {
    informations: [{
      name: 'subjectname',
      role: 'Godfather',
      state: 'alive',
      changed_party: false
    }]
  }
})

function appReducer(state = initialState, action) {
  switch (action.type) {
    case GAME_ENDED : {
      const data = fromJS(action.data)
      return state.setIn(['Game', 'winner'], data)
    }
    case WAITING_FOR_OTHERS: {
      return state.setIn(['App', 'showWaitForOpponents'], true)
    }
    case HIDE_PLAYER_INFORMATIONS: {
      return state.setIn(['App', 'showPlayerInformation'], false)
    }
    case PLAYER_INFORMED: {
      const newInformation = fromJS(action.data)
      return state.setIn(['App', 'showPlayerInformation'], true)
        .updateIn(['PlayerInformation', 'informations'], (informations) => informations.push(newInformation))
    }
    case RESET_GAME: {
      return initialState
    }
    case GAME_UPDATED: {
      const game = state.get('Game', Map())
      const data = fromJS(action.data)
      return state.setIn(['Game'], game.merge(data))
        .setIn(['App', 'showWaitForOpponents'], false)
    }
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
