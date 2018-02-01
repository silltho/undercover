import { fromJS } from 'immutable'
import {
  PLAYER_CREATED_GAME,
  PLAYER_JOINED_GAME,
  PLAYER_LEFT_GAME,
  PLAYER_STARTED_GAME,
	PLAYER_REMOVED_GAME
} from './constants'

const initialState = fromJS({ Dashboard: {} })

function getGameIndex(state, gameId) {
	const games = state.getIn(['Dashboard', 'openGames'])
  return games.findIndex((game) => game.get('id') === gameId)
}

function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case PLAYER_CREATED_GAME: {
      const game = fromJS(action.data)
      return state.updateIn(['Dashboard', 'openGames'], (games) => games.push(game))
    }
    case PLAYER_JOINED_GAME: {
      const gameIndex = getGameIndex(state, action.data.id)
      return state.setIn(['Dashboard', 'openGames', gameIndex], fromJS(action.data))
    }
    case PLAYER_LEFT_GAME: {
      const gameIndex = getGameIndex(state, action.data.id)
      return state.setIn(['Dashboard', 'openGames', gameIndex], fromJS(action.data))
    }
    case PLAYER_STARTED_GAME:
    case PLAYER_REMOVED_GAME: {
      const gameIndex = getGameIndex(state, action.data)
      return state.updateIn(['Dashboard', 'openGames'], (games) => games.delete(gameIndex))
    }
    default:
      return state
  }
}

export default dashboardReducer
