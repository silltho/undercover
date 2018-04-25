import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import PlayersList from 'components/PlayersList'
import CornerButton from 'components/CornerButton'
import IconFont, { ICONS } from 'components/IconFont'
import TownLogo from 'assets/images/fractions/town.svg'
import MafiaLogo from 'assets/images/fractions/mafia.svg'
import AnarchistsLogo from 'assets/images/fractions/anarchist.svg'

import {
  BorderContainer,
  Content,
  BorderContainerTitel,
  Scrollable
} from 'styles/components'

import Heading from 'components/Heading'

import {
  AnarchistsDistribution,
  TownMafiaDistribution,
  PartyDistribution,
  DistributionCount,
  DistributionHeading,
  FractionLogo,
  TownDistributionContainer,
  MafiaDistributionContainer
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
              <AnarchistsDistribution>
                <FractionLogo><img src={AnarchistsLogo} alt="logo" /></FractionLogo>
                <DistributionHeading>Anarchists</DistributionHeading>
                <DistributionCount>{game.getIn(['party_distribution', 'Anarchists']) || 0}</DistributionCount>
              </AnarchistsDistribution>
              <TownMafiaDistribution>
                <MafiaDistributionContainer>
                  <FractionLogo><img src={MafiaLogo} alt="logo" /></FractionLogo>
                  <DistributionHeading>Mafia</DistributionHeading>
                  <DistributionCount>{game.getIn(['party_distribution', 'Mafia']) || 0}</DistributionCount>
                </MafiaDistributionContainer>
                <TownDistributionContainer>
                  <FractionLogo><img src={TownLogo} alt="logo" /></FractionLogo>
                  <DistributionHeading>Town</DistributionHeading>
                  <DistributionCount>{game.getIn(['party_distribution', 'Town']) || 0}</DistributionCount>
                </TownDistributionContainer>
              </TownMafiaDistribution>
            </PartyDistribution>
            <Section>
              <Heading title="citizens" />
            </Section>
            <PlayersList players={game.get('players')} />
          </BorderContainer>
          <CornerButton right bottom onClickAction={startGame}>
            <IconFont icon={ICONS.checkmark} />
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
