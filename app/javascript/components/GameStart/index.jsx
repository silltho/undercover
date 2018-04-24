import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import PlayersList from 'components/PlayersList'
import IconFont, {ICONS} from 'components/IconFont'
import {
  BorderContainer,
  Content,
  BottomRight,
  BorderContainerTitel,
  Action
} from 'styles/components'

import Heading from 'components/Heading'

import {
  PartyDistribution
} from './Styles'

import {
  Section
} from '../RoleInformation/Styles'

class GameStart extends React.PureComponent {

  render() {
    const {
      game,
      startGame
    } = this.props

    return (
      <React.Fragment>
        <Content>
          <BorderContainer>
            <BorderContainerTitel>Welcome</BorderContainerTitel>
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
            <Section>
              <Heading title="citizen" />
            </Section>
            <PlayersList players={game.get('players')} />
            <BottomRight>
              <Action onClick={startGame}>
                <IconFont icon={ICONS.arrow_right} />
              </Action>
            </BottomRight>
          </BorderContainer>
        </Content>
      </React.Fragment>
    )
  }
}

GameStart.propTypes = {
  player: PropTypes.instanceOf(Map).isRequired, // eslint-disable-line react/no-unused-prop-types
  game: PropTypes.instanceOf(Map).isRequired,
  startGame: PropTypes.func.isRequired
}

export default GameStart
