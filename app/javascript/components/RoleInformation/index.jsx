import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import Heading from 'components/Heading'
import { ACTIVE_ICONS, PASSIVE_ICONS } from 'components/IconFont'

import {
  BorderContainer,
  BorderContainerTitel,
  BottomRight,
  Content,
  Action
} from 'styles/components'

import {
  Section,
  SectionText,
  SectionWrapper,
  ActiveIcon
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
            <SectionWrapper>
              <Section>
                <SectionText>{roleDetails.get('punchline')}</SectionText>
              </Section>
              <Section>
                <Heading title="Goal" />
                <SectionText>{roleDetails.get('goal')}</SectionText>
              </Section>
              <Section>
                <Heading title="Active" />
                <ActiveIcon icon={activeIcon} />
                <SectionText>{roleDetails.get('active_text')}</SectionText>
              </Section>
              {passiveIcon &&
                <Section>
                  <Heading title="Passive" />
                  <ActiveIcon icon={passiveIcon} />
                  <SectionText>{roleDetails.get('passive_text')}</SectionText>
                </Section>
              }
            </SectionWrapper>
            <BottomRight>
              <Action onClick={onRequestHide}>
                back
              </Action>
            </BottomRight>
          </BorderContainer>
        </Content>
      </React.Fragment>
    )
  }
}

RoleInformation.defaultProps = {
}

RoleInformation.propTypes = {
  roleDetails: PropTypes.instanceOf(Map).isRequired,
  onRequestHide: PropTypes.func.isRequired
}

export default RoleInformation
