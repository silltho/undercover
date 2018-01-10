import React from 'react'
import PropTypes from 'prop-types'

class GameStart extends React.PureComponent {
  renderAnonymPlayer = (player) => (
    <li>{player.nickname}</li>
  )

  renderKnownPlayer = (player) => (
    <li>{player.username} - {player.role}</li>
  )

  render() {
    const {
      currentUser,
      players,
      startGame
    } = this.props
    const anonymPlayers = players
      .filter((player) => !player.username)
      .map(this.renderAnonymPlayer)
    const knownPlayers = players
      .filter((player) => player.username)
      .map(this.renderKnownPlayer)

    return (
      <div>
        <div>Dein Deckname: {currentUser.nickname}</div>
        <div>Deine Rolle: {currentUser.role}</div>
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
  currentUser: PropTypes.object.isRequired,
  players: PropTypes.array.isRequired,
  startGame: PropTypes.func.isRequired
}

export default GameStart
