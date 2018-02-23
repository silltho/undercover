import React from 'react'
import PropTypes from 'prop-types'
import { Map, List } from 'immutable'
import PlayersList from 'components/PlayersList'
import Footer from 'components/Footer'
import Button from 'components/Button'
import {
  Wrapper,
  PartyDistribution
} from './Styles'

class GameStart extends React.PureComponent {

  render() {
    const {
      currentPlayer,
      players,
      roleDetails,
      startGame,
      partyMembers
    } = this.props

    return (
      <Wrapper>
        <PartyDistribution>
          <div>
            Party Distribution:
          </div>
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
        <PlayersList players={players} />
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
