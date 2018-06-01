import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import Heading from 'components/Heading'
import { getImageByFraction } from 'config/fractionImages'
import { getIconByPlayerState } from 'config/playerStates'
import CornerButton from 'components/CornerButton'
import IconFont, { ICONS } from 'components/IconFont'
import {
  BorderContainer,
  Content,
  Section,
  Scrollable
} from 'styles/components'
import {
  Player,
  CodeName,
  Role,
  FractionLogo,
  ImageWrapper,
  StateIcon,
  ResultText
} from './Styles'

class GameEnd extends React.PureComponent {
  renderPlayer = (player) => {
    const stateIcon = getIconByPlayerState(player.get('state'))
    const isCurrentPlayer = this.props.player.get('id') === player.get('id')
    return (
      <Player
        isCurrentPlayer={isCurrentPlayer}
        key={`player-${player.get('codename')}`}>
        <CodeName>{player.get('codename')}</CodeName>
        {stateIcon && <StateIcon icon={stateIcon} />}
        <Role>{player.get('role')}</Role>
      </Player>
    )
  }

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
    const isDraw = result === 'Draw'

    return (
      <Content>
        <BorderContainer>
          <ImageWrapper>
            {isDraw ?
              <div>Draw</div>
              :
              <React.Fragment>
                <ResultText>You are {result}</ResultText>
                <FractionLogo><img src={winnerFractionImage} alt={`logo-${winnerFraction}`} /></FractionLogo>
                <span>Winner: {winnerFraction}</span>
              </React.Fragment>
            }
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
        </BorderContainer>
        <CornerButton bottomRight onClickAction={resetGame}>
          <IconFont icon={ICONS.exit} />
        </CornerButton>
      </Content>
    )
  }
}

GameEnd.defaultProps = {
}

GameEnd.propTypes = {
  player: PropTypes.instanceOf(Map).isRequired,
  endInformation: PropTypes.instanceOf(Map).isRequired,
  resetGame: PropTypes.func.isRequired
}

export default GameEnd
