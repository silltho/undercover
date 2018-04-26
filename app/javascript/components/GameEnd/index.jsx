import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import Heading from 'components/Heading'
import FractionImages from 'config/fractionImages'
import CornerButton from 'components/CornerButton'
import IconFont, { ICONS } from 'components/IconFont'
import {
  BorderContainer,
  Content,
  BorderContainerTitel
} from 'styles/components'
import {
  Player,
  CodeName,
  Role,
  FractionLogo,
  ImageWrapper
} from './Styles'
import { Section } from '../RoleInformation/Styles'

class GameEnd extends React.PureComponent {
  renderWinnerImage = (winnerFraction) => {
    switch (winnerFraction) {
      case 'Mafia': return (
        <FractionLogo><img src={FractionImages.MAFIA} alt="mafia-logo" /></FractionLogo>
      )
      case 'Town': return (
        <FractionLogo><img src={FractionImages.TOWN} alt="mafia-logo" /></FractionLogo>
      )
      case 'Anarchists': return (
        <FractionLogo><img src={FractionImages.ANARCHISTS} alt="mafia-logo" /></FractionLogo>
      )
      default: return null
    }
  }
  renderMember = (player) => (
    <Player>
      <CodeName>{player.get('codename')}</CodeName>
      <Role>{player.get('role')}</Role>
    </Player>
  )
  renderMembers = (endInformation, member_name) => {
    const members = endInformation.get(member_name)
    return members.map((players) => this.renderMember(players))
  }

  render() {
    const {
      resetGame,
      endInformation
    } = this.props

    const END_TEXT = endInformation.get('end_text').toString()
    const WINNERFRACTION = endInformation.get('winner').get('0').get('party')

    return (
      <Content>
        <BorderContainer>
          <BorderContainerTitel>
            {END_TEXT}
          </BorderContainerTitel>
          <Content>
            <ImageWrapper>
              {WINNERFRACTION}
              {this.renderWinnerImage(WINNERFRACTION)}
              WON
            </ImageWrapper>
            <Section>
              <Heading title="mafia" />
            </Section>
            {this.renderMembers(this.props.endInformation, 'Mafia')}
            <Section>
              <Heading title="town" />
            </Section>
            {this.renderMembers(this.props.endInformation, 'Town')}
            <Section>
              <Heading title="anarchists" />
            </Section>
            {this.renderMembers(this.props.endInformation, 'Anarchists')}
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
