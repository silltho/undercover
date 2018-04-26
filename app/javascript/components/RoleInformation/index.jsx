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
  Section,
  SectionText,
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
            <Scrollable>
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
            </Scrollable>
          </BorderContainer>
          <CornerButton bottom right onClickAction={onRequestHide}>
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
  onRequestHide: PropTypes.func.isRequired
}

export default RoleInformation
