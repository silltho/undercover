import appReducer from 'containers/App/reducers'

import usersReducer from './entities/users/reducers'
import gamesReducer from './entities/games/reducers'
import dashboardReducer from './entities/dashboard/reducers'

const reducers = [
	appReducer,
  usersReducer,
  gamesReducer,
  dashboardReducer
]

// Reduce reducers to provide a single entity state object,
// combineReducers would result in a map like structure
// @see https://github.com/acdlite/reduce-reducers
export default (previous, current) => reducers.reduce(
  (p, r) => r(p, current),
  previous
)
