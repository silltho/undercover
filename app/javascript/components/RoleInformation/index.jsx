import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import Heading from 'components/Heading'
import IconFont, { ICONS, ACTIVE_ICONS, PASSIVE_ICONS } from 'components/IconFont'
import CornerButton from 'components/CornerButton'
import {
  BorderContainer,
  BorderContainerTitel,
  Content,
  Scrollable
} from 'styles/components'

import {
  StyledSection,
  SectionText,
  ActiveIcon,
  DrawButton
} from './Styles'

class RoleInformation extends React.PureComponent {
  render() {
    const {
      roleDetails,
      onRequestHide
    } = this.props

    const activeIcon = ACTIVE_ICONS[roleDetails.get('active')]
    const passiveIcon = PASSIVE_ICONS[roleDetails.get('passive')]

    return (
      <React.Fragment>
        <Content>
          <BorderContainer>
            <BorderContainerTitel align="center">{roleDetails.get('name')}</BorderContainerTitel>
            <Scrollable>
              <StyledSection>
                <SectionText>{roleDetails.get('punchline')}</SectionText>
              </StyledSection>
              <StyledSection>
                <Heading title="Goal" />
                <SectionText>{roleDetails.get('goal')}</SectionText>
              </StyledSection>
              <StyledSection>
                <Heading title="Active" />
                <ActiveIcon icon={activeIcon} />
                <SectionText>{roleDetails.get('active_text')}</SectionText>
              </StyledSection>
              {passiveIcon &&
                <StyledSection>
                  <Heading title="Passive" />
                  <ActiveIcon icon={passiveIcon} />
                  <SectionText>{roleDetails.get('passive_text')}</SectionText>
                </StyledSection>
              }
            </Scrollable>
            <DrawButton
              clicked={this.props.drawClicked}
              onClick={this.props.drawGame}
            >
              {this.props.drawClicked ? 'All alive players have to choose draw' : 'vote for draw'}
            </DrawButton>
          </BorderContainer>
          <CornerButton bottomRight onClickAction={onRequestHide}>
            <IconFont icon={ICONS.reply} />
          </CornerButton>
        </Content>
      </React.Fragment>
    )
  }
}

RoleInformation.defaultProps = {
}

RoleInformation.propTypes = {
  roleDetails: PropTypes.instanceOf(Map).isRequired,
  onRequestHide: PropTypes.func.isRequired,
  drawGame: PropTypes.func.isRequired,
  drawClicked: PropTypes.bool.isRequired
}

export default RoleInformation
