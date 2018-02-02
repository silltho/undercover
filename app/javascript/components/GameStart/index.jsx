import React from 'react'
import PropTypes from 'prop-types'
import { Map, List } from 'immutable'
import Footer from 'components/Footer'
import Button from 'components/Button'
import {
  Wrapper,
  PartyDistribution
} from './Styles'

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
      <Wrapper>
        <PartyDistribution>
          <div>
            Mafia: {partyMembers.get('Mafia')}
          </div>
          <div>
            Town: {partyMembers.get('Town')}
          </div>
          <div>
            Anarchists: {partyMembers.get('Anarchist')}
          </div>
        </PartyDistribution>
        <Footer>
          <Button onClick={startGame} text="got it" />
        </Footer>
      </Wrapper>
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
