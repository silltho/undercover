import { fromJS } from 'immutable'
import {
  CREATE_GAME_SUCCESS,
  JOIN_GAME_SUCCESS,
  LEAVE_GAME_SUCCESS,
  GET_USERINFO,
  GET_CURRENT_GAME,
  PLAYER_CREATED_GAME
} from 'services/constants'

const initialState = fromJS({
  App: {
    currentUser: null,
    currentGame: null
  }
})

function appReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_GAME_SUCCESS:
    case GET_CURRENT_GAME:
    case JOIN_GAME_SUCCESS: {
      return state.setIn(['App', 'currentGame'], fromJS(action.data))
    }
    case LEAVE_GAME_SUCCESS: {
      return state.setIn(['App', 'currentGame'], null)
    }
    case GET_USERINFO: {
      return state.setIn(['App', 'currentUser'], fromJS(action.data))
    }
    case PLAYER_CREATED_GAME: {
      const game = fromJS(action.data)
      if (state.getIn(['App', 'currentGame', 'id']) === game.get('id')) {
        return state.setIn(['App', 'currentGame'], game)
      }
      return state
    }
    default:
      return state
  }
}

export default appReducer
