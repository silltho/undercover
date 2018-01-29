import React from 'react'
import { fromJS, List } from 'immutable'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import {
  RaisedButton,
  TextField,
  Paper
} from 'material-ui'
import { UserChannel, GameChannel } from 'services/channels'
import GameList from 'components/OpenGamesList'

class Home extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      createGameTitle: ''
    }
  }

  onCreateGameInputChange = (e, value) => {
    this.setState({
	    createGameTitle: value
    })
  }

  createGame = () => {
    this.props.createGame(this.state.createGameTitle)
	  this.setState({
		  createGameTitle: ''
	  })
  }

  joinGame = (id) => {
    this.props.history.push('/lobby')
    this.props.joinGame(id)
  }

  render() {
    return (
      <div>
        <Paper zDepth={1}>
          <TextField name="create-game-input" onChange={this.onCreateGameInputChange} />
          <RaisedButton label="create new game" primary onClick={this.createGame} />
        </Paper>
        <Paper zDepth={1}>
          <GameList
            openGames={this.props.games}
            onGetOpenGames={this.props.getOpenGames}
            joinGame={this.joinGame}
          />
        </Paper>
        <Paper zDepth={1}>
          <Link to="/game">show Game</Link>
        </Paper>
      </div>
    )
  }
}

Home.propTypes = {
  history: PropTypes.object.isRequired,
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
  games: state.get('games', fromJS([])),
  currentGameId: state.getIn(['Home', 'joinedGameId'], null)
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Home))
