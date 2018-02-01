import appReducer from 'containers/App/reducers'
import gameReducer from 'containers/Game/reducers'

import dashboardReducer from '../containers/Dashboard/reducers'

const reducers = [
  appReducer,
  gameReducer,
  dashboardReducer
]

// Reduce reducers to provide a single entity state object,
// combineReducers would result in a map like structure
// @see https://github.com/acdlite/reduce-reducers
export default (previous, current) => reducers.reduce(
  (p, r) => r(p, current),
  previous
)
