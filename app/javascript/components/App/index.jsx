import React from 'react'
import { UserChannel } from 'services'
import {
  GET_OPEN_GAMES,
  GET_USERINFO
} from 'services/constants'

import GameList from 'components/GameList'

const initState = {
  games: [],
  currentUser: false
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case GET_OPEN_GAMES:
      console.log('open Games:', action.data.games)
      return { games: action.data.games }
    case GET_USERINFO:
      console.log('Userinfo:', action.data)
      return { currentUser: action.data }
    default:
      return state
  }
}

class App extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = reducer(undefined, {})
    UserChannel.setCallback((action) => this.dispatch(action))
  }

  dispatch = (action) => {
    this.setState((prevState) => reducer(prevState, action))
  }

  render() {
    return (
      <div>
        <h2>Undercover App</h2>
        <hr />
        { this.state.currentUser && (
        <div>
            Hallo {this.state.currentUser.email}
          <hr />
        </div>
          )
        }
        <h3>Open Games:</h3>
        <GameList
          openGames={this.state.games}
          onGetOpenGames={UserChannel.getOpenGames}
        />
        <hr />
      </div>
    )
  }
}

export default App
