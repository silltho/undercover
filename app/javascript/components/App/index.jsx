import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { UserChannel } from 'services'
import {
  GET_OPEN_GAMES,
  GET_USERINFO
} from 'services/constants'
import GameList from 'components/GameList'
import Nav from 'components/Nav'


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
      <MuiThemeProvider>
        <div>
          <Nav />
          <GameList
            openGames={this.state.games}
            onGetOpenGames={UserChannel.getOpenGames}
          />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
