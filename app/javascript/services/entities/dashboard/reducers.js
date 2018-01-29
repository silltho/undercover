import { fromJS } from 'immutable'
import {
  GAME_CREATED,
  GAME_DESTROYED,
  CREATE_GAME
} from './constants'

const initialState = fromJS({})

function getGameIndex(games, gameId) {
    return games.findIndex((game) => game.get('id') === gameId)
}

function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case GAME_CREATED:
      const game = fromJS(action.data)
      console.log('game created:', action.data)
      return state.updateIn(['games'], (games) => games.push(game))
    case GAME_DESTROYED: {
        console.log('game_destroyed:', action.data)
        const gameIndex = getGameIndex(state.get('games'), action.data)
        return state.updateIn(['games'], (games) => games.delete(gameIndex))
    }
    case CREATE_GAME: {
      const game = fromJS(action.data)
      console.log('new Game:', game.toJS())
      return state.updateIn(['games'], (games) => games.push(game))
    }
    default:
      return state
  }
}

export default dashboardReducer
