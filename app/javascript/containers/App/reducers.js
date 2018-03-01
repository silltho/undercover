import { fromJS } from 'immutable'
import {
  CREATE_GAME_SUCCESS,
  GAME_UPDATED
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
		  return state.setIn(['Game'], fromJS(action.data))
	  }
    default:
      return state
  }
}

export default appReducer
