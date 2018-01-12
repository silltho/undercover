import { fromJS } from 'immutable'
import {
  JOIN_GAME
} from './constants'

const initialState = fromJS({})

function gamesReducer(state = initialState, action) {
  switch (action.type) {
    case JOIN_GAME:
      console.log('join game:', action.data)
      return state
    default:
      return state
  }
}

export default gamesReducer
