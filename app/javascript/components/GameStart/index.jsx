import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
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
      game,
      startGame
    } = this.props

    return (
      <Wrapper>
        <PartyDistribution>
          <div>
            <u>Party Distribution:</u>
          </div>
          <div>
            Mafia: {game.getIn(['party_distribution', 'Mafia']) || 0}
          </div>
          <div>
            Town: {game.getIn(['party_distribution', 'Town']) || 0}
          </div>
          <div>
            Anarchists: {game.getIn(['party_distribution', 'Anarchists']) || 0}
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
  player: PropTypes.instanceOf(Map).isRequired, // eslint-disable-line react/no-unused-prop-types
  game: PropTypes.instanceOf(Map).isRequired,
  startGame: PropTypes.func.isRequired
}

export default GameStart
