import { fromJS } from 'immutable'
import {
  CREATE_GAME_SUCCESS,
  JOIN_GAME_SUCCESS,
  LEAVE_GAME_SUCCESS,
  GET_USERINFO,
  GET_CURRENT_GAME,
  PLAYER_JOINED_GAME,
  PLAYER_LEFT_GAME,
  INFO_PHASE_ENDED,
  ACTIVITY_PHASE_ENDED,
  EXCHANGE_PHASE_ENDED,
  PLAYER_STARTED_GAME
} from 'services/constants'

const initialState = fromJS({
  Game: {},
  Player: {},
  RoundInformation: {}
})

function appReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_GAME_SUCCESS: {
      return state.setIn(['Game'], fromJS(action.data))
    }
    default:
      return state
  }
}

export default appReducer
