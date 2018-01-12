import { fromJS } from 'immutable'
import {
  JOIN_GAME
} from './constants'

const initialState = fromJS({})

function gamesReducer(state = initialState, action) {
  switch (action.type) {
    case JOIN_GAME: {
      console.log('join game:', action.data)
      const gameIndex = state.get('games').findIndex((game) => game.get('id') === action.data.id)
      return state.setIn(['games', gameIndex], fromJS(action.data))
    }
    default:
      return state
  }
}

export default gamesReducer
