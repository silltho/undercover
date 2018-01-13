import homeReducer from 'containers/Lobby/reducers'
import usersReducer from './entities/users/reducers'
import gamesReducer from './entities/games/reducers'

const reducers = [
  usersReducer,
  gamesReducer,
  homeReducer
]

// Reduce reducers to provide a single entity state object,
// combineReducers would result in a map like structure
// @see https://github.com/acdlite/reduce-reducers
export default (previous, current) => reducers.reduce(
  (p, r) => r(p, current),
  previous
)
