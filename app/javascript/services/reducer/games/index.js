import {
  GET_OPEN_GAMES
} from 'services/constants'

const initialState = {}

function gamesReducer(state = initialState, action) {
  switch (action.type) {
	  case GET_OPEN_GAMES:
		  console.log('open Games:', action.data.games)
		  return { ...state, games: action.data.games }
    default:
      return state
  }
}

export default gamesReducer
