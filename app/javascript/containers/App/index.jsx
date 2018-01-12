import React from 'react'
import { fromJS, List } from 'immutable'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { UserChannel, GameChannel } from 'services/channels'
import GameList from 'components/GameList'
import Nav from 'components/Nav'
import Game from 'components/Game'

class App extends React.PureComponent {
  createGame = () => {
    const title = this.input.value
    this.props.createGame(title)
  }

  render() {
    return (
      <MuiThemeProvider>
        {/* <Game />  */}
        <div>
          <Nav />
          <GameList
            openGames={this.props.games}
            onGetOpenGames={this.props.getOpenGames}
            joinGame={this.props.joinGame}
          />
          <input type="text" ref={ (input) => this.input = input } />
          <button onClick={this.createGame}>create game</button>
        </div>
      </MuiThemeProvider>
    )
  }
}

App.propTypes = {
  games: PropTypes.instanceOf(List).isRequired,
  getOpenGames: PropTypes.func.isRequired,
  createGame: PropTypes.func.isRequired,
  joinGame: PropTypes.func.isRequired
}

export const mapDispatchToProps = () => ({
  getOpenGames: UserChannel.getOpenGames,
  createGame: UserChannel.createGame,
  joinGame: GameChannel.joinGame
})

const mapStateToProps = (state) => ({
  games: state.get('games', fromJS([]))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
