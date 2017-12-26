import React from 'react'
import consumer from 'services/'

class App extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      games: [],
      isConnected: false
    }

    consumer.subscriptions.create({ channel: 'ApplicationChannel' }, {
      connected: this.handleConnected,
      received: this.handleReceived,
      disconnected: this.handleDisconnected
    })
  }

  handleConnected = () => {
    console.log('test1')
    consumer.subscriptions.create({ channel: 'UserChannel' }, {
      connected: () => { console.log('connected') },
      received: (data) => { console.log('getOpenGames', data) }
    })
    this.setState({
      isConnected: true
    })
  }

  handleReceived = (data) => {
    this.setState({
      currentUser: data.currentUser,
      games: JSON.parse(data.games)
    })
  }

  handleDisconnected = () => {
    this.setState({
      isConnected: false,
      games: []
    })
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
        <h3>Games:</h3>
        <ul>
          {games}
        </ul>
        <hr />
      </div>
    )
  }
}

export default App
