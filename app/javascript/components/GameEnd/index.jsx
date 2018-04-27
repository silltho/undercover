import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import Heading from 'components/Heading'
import { getImageByFraction } from 'config/fractionImages'
import CornerButton from 'components/CornerButton'
import IconFont, { ICONS } from 'components/IconFont'
import {
  BorderContainer,
  Content,
  BorderContainerTitel,
  Section,
  Scrollable
} from 'styles/components'
import {
  Player,
  CodeName,
  Role,
  FractionLogo,
  ImageWrapper
} from './Styles'

class GameEnd extends React.PureComponent {
  renderPlayer = (player) => (
    <Player key={`player-${player.get('codename')}`}>
      <CodeName>{player.get('codename')}</CodeName>
      <Role>{player.get('role')}</Role>
    </Player>
  )

  render() {
    const {
      resetGame,
      endInformation
    } = this.props

    const result = endInformation.get('end_text', 'fallback')
    const winnerFraction = endInformation.getIn(['winner', '0', 'party'])
    const renderedMafia = this.props.endInformation.get('Mafia', Map()).map((players) => this.renderPlayer(players)).valueSeq()
    const renderedTown = this.props.endInformation.get('Town', Map()).map((players) => this.renderPlayer(players)).valueSeq()
    const renderedAnarchists = this.props.endInformation.get('Anarchists', Map()).map((players) => this.renderPlayer(players)).valueSeq()
    const winnerFractionImage = getImageByFraction(winnerFraction)

    return (
      <Content>
        <BorderContainer>
          <BorderContainerTitel>{result}</BorderContainerTitel>
          <Content>
            <ImageWrapper>
              {winnerFraction}
              <FractionLogo><img src={winnerFractionImage} alt={`logo-${winnerFraction}`} /></FractionLogo>
              WON
            </ImageWrapper>
            <Scrollable>
              <Section>
                <Heading title="mafia" />
                {renderedMafia}
              </Section>
              <Section>
                <Heading title="town" />
                {renderedTown}
              </Section>
              <Section>
                <Heading title="anarchists" />
                {renderedAnarchists}
              </Section>
            </Scrollable>
          </Content>
        </BorderContainer>
        <CornerButton bottom right onClickAction={resetGame}>
          <IconFont icon={ICONS.exit} />
        </CornerButton>
      </Content>
    )
  }
}

GameEnd.defaultProps = {
}

GameEnd.propTypes = {
  endInformation: PropTypes.instanceOf(Map).isRequired,
  resetGame: PropTypes.func.isRequired
}

export default GameEnd
