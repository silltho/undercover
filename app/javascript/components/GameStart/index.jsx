import React from 'react'
import PropTypes from 'prop-types'

class GameStart extends React.PureComponent {
  renderAnonymPlayer = (player) => (
    <li key={`anonym-player-${player.nickname}`}>{player.nickname}</li>
  )

  renderKnownPlayer = (player) => (
    <li key={`known-player-${player.username}`}>{player.username} - {player.role}</li>
  )

  render() {
    const {
      currentPlayer,
      players
    } = this.props
    const anonymPlayers = players
      .filter((player) => !player.username)
      .map(this.renderAnonymPlayer)
    const knownPlayers = players
      .filter((player) => player.username)
      .map(this.renderKnownPlayer)

    return (
      <div>
        <div>Dein Deckname: {currentPlayer.get('codename')}</div>
        <div>Deine Rolle: {currentPlayer.getIn(['role', ])}</div>
        <div>Spieler die du kennst:
          <ul>
            {knownPlayers}
          </ul>
        </div>
        <div>Andere Spieler:
          <ul>
	          {anonymPlayers}
          </ul>
        </div>
        <button onClick={startGame}>
          verstanden
        </button>
      </div>
    )
  }
}

GameStart.propTypes = {
  currentPlayer: PropTypes.object.isRequired,
  players: PropTypes.array.isRequired
}

export default GameStart
