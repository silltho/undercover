import React from 'react'
import PropTypes from 'prop-types'
import { Map, List } from 'immutable'

class GameStart extends React.PureComponent {
  renderPlayer = (player) => (
    <li key={`player-${player.get('id')}`}>{player.get('codename')}</li>
  )


  render() {
    const {
      currentPlayer,
      players,
      roleDetails,
      startGame,
      partyMembers
    } = this.props
    //const renderedPlayers = players.map(this.renderPlayer)

    return (
      <div>
        <div>
          Mafia: {partyMembers.get('Mafia')}
        </div>
        <div>
          Town: {partyMembers.get('Town')}
        </div>
        <button onClick={startGame}>got it</button>
      </div>
    )
  }
}

GameStart.propTypes = {
	currentPlayer: PropTypes.instanceOf(Map).isRequired,
	roleDetails: PropTypes.instanceOf(Map).isRequired,
  players: PropTypes.instanceOf(List).isRequired,
  startGame: PropTypes.func.isRequired,
	partyMembers: PropTypes.instanceOf(Map).isRequired
}

export default GameStart
