import { fromJS } from 'immutable'
import {
  JOIN_GAME,
  DESTROY_GAME
} from './constants'

const initialState = fromJS({})

function gamesReducer(state = initialState, action) {
  console.log(action)
  switch (action.type) {
    case JOIN_GAME: {
      console.log('join game:', action.data)
      const gameIndex = getGameIndex(state.get('games'), action.data.id)
      return state.setIn(['games', gameIndex], fromJS(action.data))
    }
    case DESTROY_GAME: {
	    console.log('destroy game:', action.data)
      const gameIndex = getGameIndex(state.get('games'), action.data)
      return state.updateIn(['games'], (games) => games.delete(gameIndex))
    }
    default:
      return state
  }
}

export default gamesReducer
