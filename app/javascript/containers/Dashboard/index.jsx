import React from 'react'
import { fromJS, List } from 'immutable'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { UserChannel, GameChannel, DashboardChannel } from 'services/channels'
import GameList from 'components/OpenGamesList'
import StartNewGame from 'components/StartNewGame'
import Footer from 'components/Footer'
import { Wrapper } from './Styles'

class Dashboard extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      StartNewGameOpen: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentGameId && nextProps.currentGameId !== -1) {
      this.joinGame(nextProps.currentGameId)
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
    this.props.history.push('/lobby')
    this.props.joinGame(id)
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
  currentGameId: null
}

Dashboard.propTypes = {
  history: PropTypes.object.isRequired,
  games: PropTypes.instanceOf(List).isRequired,
  getOpenGames: PropTypes.func.isRequired,
  createGame: PropTypes.func.isRequired,
  joinGame: PropTypes.func.isRequired,
  currentGameId: PropTypes.number
}

export const mapDispatchToProps = () => ({
  getOpenGames: UserChannel.getOpenGames,
  createGame: DashboardChannel.createGame,
  joinGame: GameChannel.joinGame
})

const mapStateToProps = (state) => ({
  games: state.get('games', fromJS([])),
  currentGameId: state.getIn(['App', 'currentGameId'], -1)
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard))
