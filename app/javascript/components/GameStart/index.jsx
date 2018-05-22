import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import PlayersList from 'components/PlayersList'
import CornerButton from 'components/CornerButton'
import IconFont, { ICONS } from 'components/IconFont'
import FractionImages from 'config/fractionImages'

import {
  BorderContainer,
  Content,
  BorderContainerTitel,
  Section
} from 'styles/components'

import Heading from 'components/Heading'

import {
  AnarchistsDistribution,
  PartyDistribution,
  DistributionCount,
  DistributionHeading,
  FractionLogo,
  TownDistributionContainer,
  MafiaDistributionContainer,
  PlayerCodename
} from './Styles'

class GameStart extends React.PureComponent {

  render() {
    const {
      game,
      startGame,
      player
    } = this.props

    return (
      <React.Fragment>
        <Content>
          <BorderContainer>
            <BorderContainerTitel>Welcome</BorderContainerTitel>
            <PartyDistribution>
              <MafiaDistributionContainer>
                <FractionLogo><img src={FractionImages.MAFIA} alt="mafia-logo" /></FractionLogo>
                <DistributionHeading>Mafia</DistributionHeading>
                <DistributionCount>{game.getIn(['party_distribution', 'Mafia']) || 0}</DistributionCount>
              </MafiaDistributionContainer>
              <AnarchistsDistribution>
                <FractionLogo><img src={FractionImages.ANARCHISTS} alt="anarchists-logo" /></FractionLogo>
                <DistributionHeading>Anarchists</DistributionHeading>
                <DistributionCount>{game.getIn(['party_distribution', 'Anarchists']) || 0}</DistributionCount>
              </AnarchistsDistribution>
              <TownDistributionContainer>
                <FractionLogo><img src={FractionImages.TOWN} alt="town-logo" /></FractionLogo>
                <DistributionHeading>Town</DistributionHeading>
                <DistributionCount>{game.getIn(['party_distribution', 'Town']) || 0}</DistributionCount>
              </TownDistributionContainer>
            </PartyDistribution>
            <Section>
              <Heading title="citizens" />
              <PlayersList players={game.get('players')} />
            </Section>
          </BorderContainer>
          <CornerButton bottomRight onClickAction={startGame}>
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
