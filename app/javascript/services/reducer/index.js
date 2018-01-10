import usersReducer from './users'
import gamesReducer from './games'

const reducers = [
  usersReducer,
  gamesReducer
]

// Reduce reducers to provide a single entity state object,
// combineReducers would result in a map like structure
// @see https://github.com/acdlite/reduce-reducers
export default (previous, current) => reducers.reduce(
  (p, r) => r(p, current),
  previous
)
