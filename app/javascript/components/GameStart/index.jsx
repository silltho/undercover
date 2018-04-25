import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import PlayersList from 'components/PlayersList'
import IconFont, {ICONS} from 'components/IconFont'
import {
  BorderContainer,
  Content,
  CornerButton,
  BorderContainerTitel,
  Action
} from 'styles/components'

import Heading from 'components/Heading'

import {
  AnarchistsDistribution,
  TownMafiaDistribution,
  PartyDistribution,
  DistributionCount,
  DistributionHeading
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
              <TownMafiaDistribution>
                <div>
                  <DistributionHeading>Mafia</DistributionHeading>
                  <DistributionCount>{game.getIn(['party_distribution', 'Mafia']) || 0}</DistributionCount>
                </div>
                <div>
                  <DistributionHeading>Town</DistributionHeading>
                  <DistributionCount>{game.getIn(['party_distribution', 'Town']) || 0}</DistributionCount>
                </div>
              </TownMafiaDistribution>

              <AnarchistsDistribution>
                <DistributionHeading>Anarchists</DistributionHeading>
                <DistributionCount>{game.getIn(['party_distribution', 'Anarchists']) || 0}</DistributionCount>
              </AnarchistsDistribution>
            </PartyDistribution>
            <Section>
              <Heading title="citizen" />
            </Section>
            <PlayersList players={game.get('players')} />
          </BorderContainer>
          <CornerButton right bottom onClick={startGame}>
            <IconFont icon={ICONS.ready} />
          </CornerButton>
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
