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
  GAME_ENDED,
  WINNING_INFORMATION,
  WRONG_GAMECODE,
  FULL_GAME
} from 'services/constants'

const initialState = fromJS({
  App: {
    showPlayerInformation: false,
    showWaitForOpponents: false,
    showWrongGamecode: false,
    showFullGame: false
  },
  Game: {
    round_info: {},
    end_info: {}
  },
  Player: {
    infos: []
  }
})

function appReducer(state = initialState, action) {
  switch (action.type) {
    case FULL_GAME: {
      return state.setIn(['App', 'showFullGame'], true)
    }
    case WRONG_GAMECODE: {
      return state.setIn(['App', 'showWrongGamecode'], true)
    }
    case WINNING_INFORMATION: {
      const data = fromJS(action.data)
      return state.setIn(['Game', 'end_info', 'end_text'], data)
    }
    case GAME_ENDED : {
      const data = fromJS(action.data)
      return state.setIn(['Game', 'end_info'], data)
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
        .updateIn(['Player', 'infos'], (informations) => informations.push(newInformation))
    }
    case GAME_UPDATED: {
      const game = state.get('Game', Map())
      const data = fromJS(action.data)
      return state.setIn(['Game'], game.merge(data))
        .setIn(['App', 'showWaitForOpponents'], false)
        .setIn(['App', 'showWrongGamecode'], false)
        .setIn(['App', 'showFullGame'], false)
    }
    case CREATE_GAME_SUCCESS: {
      const game = state.get('Game', Map())
      const data = fromJS(action.data)
      return state.setIn(['Game'], game.merge(data))
        .setIn(['App', 'showWrongGamecode'], false)
        .setIn(['App', 'showFullGame'], false)
    }
    case LEAVE_GAME_SUCCESS:
    case RESET_GAME:
    case GAME_DELETE: {
      return initialState
    }
    case PLAYER_UPDATED: {
      const player = state.get('Player', Map())
      const data = fromJS(action.data)
      return state.set('Player', player.merge(data))
    }
    case INFORMATION_UPDATED: {
      return state.mergeIn(['Game', 'round_info'], fromJS(action.data))
    }
    default:
      return state
  }
}

export default appReducer
