import { fromJS } from 'immutable'
import {
  CREATE_GAME_SUCCESS,
  JOIN_GAME_SUCCESS,
  LEAVE_GAME_SUCCESS,
  GET_USERINFO
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
    case JOIN_GAME_SUCCESS: {
      return state.setIn(['App', 'currentGame'], fromJS(action.data))
    }
    case LEAVE_GAME_SUCCESS: {
      return state.setIn(['App', 'currentGame'], null)
    }
    case GET_USERINFO: {
      return state.setIn(['App', 'currentUser'], fromJS(action.data))
    }
    default:
      return state
  }
}

export default appReducer
