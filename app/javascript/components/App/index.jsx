import React from 'react'
import { UserChannel } from 'services'
import {
  GET_OPEN_GAMES,
  GET_USERINFO
} from 'services/constants'


class App extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      games: [],
      currentUser: false
    }

	  this.init()
  }

  init = () => {
    UserChannel.setCallback((action) => {
      switch (action.type) {
        case GET_OPEN_GAMES: {
          console.log('open Games:', action.data.games)
          this.setState({
            games: action.data.games
          })
          break
        }
        case GET_USERINFO: {
          console.log('Userinfo:', action.data)
          this.setState({
            currentUser: action.data
          })
          break
        }
        default:
      }
    })
  }

  onClick = () => {
	  UserChannel.getOpenGames()
  }

  renderGame = (game) => (
    <li key={game.id}>{game.title}</li>
  )

  render() {
    const games = this.state.games ? this.state.games.map((game) => this.renderGame(game)) : 'keine Games gefunden :('

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
        <h3 onClick={this.onClick}>Games:</h3>
        <ul>
          {games}
        </ul>
        <hr />
      </div>
    )
  }
}

export default App
