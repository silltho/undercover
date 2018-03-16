import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import Header from 'components/Header'
import Content from 'components/Content'
import Footer from 'components/Footer'
import Button from 'components/Button'
import IconFont, { ICONS } from 'components/IconFont'
import {
  RoleImage
} from './Styles'

class RoleOverview extends React.PureComponent {
  render() {
    const {
      roleDetails,
      showTargetSelection,
	    showRoleInformation,
      skipPhase,
      currentTarget
    } = this.props

    const skillText = currentTarget.has('codename') ? `${roleDetails.get('active')}:  ${currentTarget.get('codename')}` : roleDetails.get('active')

    return (
      <React.Fragment>
        <Header>
          {roleDetails.get('name')}
        </Header>
        <Content>
          <RoleImage background={roleDetails.get('image')} />
        </Content>
        <Footer>
          <Button onClick={showRoleInformation}>
            <IconFont icon={ICONS.home} />
          </Button>
          <Button onClick={showTargetSelection} text={skillText} />
          <Button onClick={skipPhase}>
            <IconFont icon={ICONS.next2} />
          </Button>
        </Footer>
      </React.Fragment>
    )
  }
}

RoleOverview.defaultProps = {
  currentTarget: Map()
}

RoleOverview.propTypes = {
  roleDetails: PropTypes.instanceOf(Map).isRequired,
	showTargetSelection: PropTypes.func.isRequired,
	showRoleInformation: PropTypes.func.isRequired,
  skipPhase: PropTypes.func.isRequired,
  currentTarget: PropTypes.instanceOf(Map)
}

export default RoleOverview
