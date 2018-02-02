import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'

class GameStart extends React.PureComponent {
  renderPlayer = (player) => (
    <li key={`player-${player.get('id')}`}>{player.get('codename')}</li>
  )

  render() {
    const {
      currentPlayer,
      players,
      roleDetails
    } = this.props
    const renderedPlayers = players.map(this.renderPlayer)

    return (
      <div>
        <div>Dein Deckname: {currentPlayer.get('codename')}</div>
        <div>Deine Rolle: {roleDetails.get('name')}</div>
        <div>Andere Spieler:
          <ul>
	          {renderedPlayers}
          </ul>
        </div>
        <button>
          verstanden
        </button>
      </div>
    )
  }
}

GameStart.propTypes = {
	currentPlayer: PropTypes.instanceOf(Map).isRequired,
	roleDetails: PropTypes.instanceOf(Map).isRequired,
  players: PropTypes.array.isRequired
}

export default GameStart
