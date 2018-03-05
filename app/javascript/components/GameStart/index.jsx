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
      player,
      game,
      startGame
    } = this.props

    return (
      <Wrapper>
        <PartyDistribution>
          <div>
            Party Distribution:
          </div>
          <div>
            Mafia: {game.getIn(['party_distribution', 'Mafia'])}
          </div>
          <div>
            Town: {game.getIn(['party_distribution', 'Town'])}
          </div>
          <div>
            Anarchists: {game.getIn(['party_distribution', 'Anarchists'])}
          </div>
        </PartyDistribution>
        <PlayersList players={game.get('players')} />
        <Footer>
          <Button onClick={startGame} text="got it" />
        </Footer>
      </Wrapper>
    )
  }
}

GameStart.propTypes = {
	player: PropTypes.instanceOf(Map).isRequired,
	game: PropTypes.instanceOf(Map).isRequired,
  startGame: PropTypes.func.isRequired
}

export default GameStart
