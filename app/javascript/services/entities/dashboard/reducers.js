import { fromJS } from 'immutable'
import {
	PLAYER_CREATED_GAME,
	PLAYER_JOINED_GAME,
	GAME_DESTROYED,
	CREATE_GAME,
	PLAYER_LEFT_GAME
} from './constants'

const initialState = fromJS({})

function getGameIndex(games, gameId) {
  return games.findIndex((game) => game.get('id') === gameId)
}

function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case PLAYER_CREATED_GAME:
      const game = fromJS(action.data)
      return state.updateIn(['games'], (games) => games.push(game))
	  case PLAYER_JOINED_GAME: {
		  const gameIndex = getGameIndex(state.get('games'), action.data.id)
		  return state.setIn(['games', gameIndex], fromJS(action.data))
	  }
	  case PLAYER_LEFT_GAME: {
		  const gameIndex = getGameIndex(state.get('games'), action.data.id)
		  return state.setIn(['games', gameIndex], fromJS(action.data))
	  }
    case GAME_DESTROYED: {
        console.log('game_destroyed:', action.data)
        const gameIndex = getGameIndex(state.get('games'), action.data)
        return state.updateIn(['games'], (games) => games.delete(gameIndex))
    }
    default:
      return state
  }
}

export default dashboardReducer
