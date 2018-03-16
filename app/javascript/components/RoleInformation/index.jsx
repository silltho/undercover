import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import Content from 'components/Content'
import Footer from 'components/Footer'
import Button from 'components/Button'
import Heading from 'components/Heading'
import IconFont, { ICONS } from 'components/IconFont'
import LogoImage from 'assets/images/logo_frame.png'

import {
  RoleName,
  Container,
  Logo,
  Section,
  SectionText
} from './Styles'

class RoleInformation extends React.PureComponent {
  render() {
    const {
      roleDetails,
      onRequestHide
    } = this.props

    return (
      <React.Fragment>
        <Content>
          <Container>
            <RoleName align="center">{roleDetails.get('name')}</RoleName>
            <Logo src={LogoImage} />
            <Section>
              <SectionText>{roleDetails.get('punchline')}</SectionText>
            </Section>
            <Section>
              <Heading title="Goal" />
              <SectionText>{roleDetails.get('goal')}</SectionText>
            </Section>
            <Section>
              <Heading title="Active" />
              <SectionText>{roleDetails.get('active_text')}</SectionText>
            </Section>
          </Container>
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
