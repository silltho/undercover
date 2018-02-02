import React from 'react'
import { fromJS, List, Map } from 'immutable'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { UserChannel, GameChannel, DashboardChannel } from 'services/channels'
import GameList from 'components/GamesList'
import StartNewGame from 'components/StartNewGame'
import { Wrapper } from './Styles'

class Dashboard extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      StartNewGameOpen: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentGame && nextProps.currentGame.get('id')) {
      this.joinGame(nextProps.currentGame.get('id'))
    }
  }

  openStartNewGame= () => {
    this.setState({
      StartNewGameOpen: true
    })
  }

  closeStartNewGame = () => {
    this.setState({
      StartNewGameOpen: false
    })
  }

  joinGame = (id) => {
    this.props.joinGame(id)
	  this.props.history.push('/lobby')
  }

  render() {
    return (
      <Wrapper>
        {this.state.StartNewGameOpen ? (
          <StartNewGame
            onRequestClose={this.closeStartNewGame}
            createGame={this.props.createGame}
          />
        ) : (
          <GameList
            openGames={this.props.games}
            onGetOpenGames={this.props.getOpenGames}
            joinGame={this.joinGame}
            openStartNewGame={this.openStartNewGame}
          />
        )}
      </Wrapper>
    )
  }
}

Dashboard.defaultProps = {
  currentGame: null
}

Dashboard.propTypes = {
  history: PropTypes.object.isRequired,
  games: PropTypes.instanceOf(List).isRequired,
  getOpenGames: PropTypes.func.isRequired,
  createGame: PropTypes.func.isRequired,
  joinGame: PropTypes.func.isRequired,
  currentGame: PropTypes.instanceOf(Map)
}

export const mapDispatchToProps = () => ({
  getOpenGames: UserChannel.getOpenGames,
  createGame: DashboardChannel.createGame,
  joinGame: (gameId) => {
    DashboardChannel.joinGame(gameId)
    GameChannel.joinGameChannel(gameId)
  }
})

const mapStateToProps = (state) => ({
  games: state.getIn(['Dashboard', 'openGames'], fromJS([])),
  currentGame: state.getIn(['App', 'currentGame'], null)
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard))
