import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import Content from 'components/Content'
import Footer from 'components/Footer'
import Button from 'components/Button'
import Heading from 'components/Heading'
import IconFont, { ICONS, ACTIVE_ICONS } from 'components/IconFont'
import LogoImage from 'assets/images/logo_frame.png'

import {
  BorderContainer,
  BorderContainerTitel
} from 'styles/components'

import {
  Logo,
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

    return (
      <React.Fragment>
        <Content>
          <BorderContainer>
            <BorderContainerTitel align="center">{roleDetails.get('name')}</BorderContainerTitel>
            <Logo src={LogoImage} />
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
            </SectionWrapper>
          </BorderContainer>
        </Content>
        <Footer>
          <Button onClick={onRequestHide}>
            <IconFont icon={ICONS.circle_left} />
          </Button>
        </Footer>
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
