import { fromJS } from 'immutable'
import {
  GET_USERINFO,
  CREATE_GAME,
  GET_OPEN_GAMES
} from './constants'

const initialState = fromJS({})

function usersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERINFO:
      console.log('Userinfo:', action.data)
      return state
        .set('currentUser', action.data)
    case CREATE_GAME: {
	    const game = fromJS(action.data)
	    console.log('new Game:', game.toJS())
	    return state.updateIn(['games'], (games) => games.push(game))
    }
    case GET_OPEN_GAMES:
      console.log('open Games:', action.data.games)
      return state.set('games', fromJS(action.data.games))
    default:
      return state
  }
}

export default usersReducer
