import React from 'react'
import { Map, List } from 'immutable'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { DashboardChannel } from 'services/channels'
import { leaveGame } from 'services/actions'

function getGame(state) {
  const gameId = state.getIn(['App', 'currentGameId'])
  const index = state.get('games').findIndex((game) => game.get('id') === gameId)
  return state.getIn(['games', index])
}

class Lobby extends React.PureComponent {
  leaveGame = () => {
	  this.props.leaveGame()
	  this.props.history.push('/')
  }

  renderPlayer = (player) => (
    <li key={`player_${player.get('id')}`}>
      {player.get('email')}
    </li>
  )

  render() {
    const { currentGame } = this.props
    console.log('current', currentGame.toJS())
    const players = currentGame.get('users', List()).map(this.renderPlayer)
    console.log(currentGame.toJS())

    return (
      <div>
        <span>Players:</span>
        <ul>
          {players}
        </ul>
        <button onClick={this.leaveGame}>leave Game</button>
      </div>
    )
  }
}


Lobby.propTypes = {
  history: PropTypes.object.isRequired,
  currentGame: PropTypes.instanceOf(Map).isRequired,
  leaveGame: PropTypes.func.isRequired
}

export const mapDispatchToProps = (dispatch) => ({
  leaveGame: () => {
    DashboardChannel.leaveGame()
    dispatch(leaveGame())
  }
})

const mapStateToProps = (state) => ({
  currentGame: getGame(state)
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Lobby))
