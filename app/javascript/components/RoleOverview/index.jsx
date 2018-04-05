import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import { ICONS, ACTIVE_ICONS } from 'components/IconFont'
import { getVideoByRole, getImageByRole } from 'config/roleImages'
import {
  BorderContainer,
  BorderContainerTitel,
  BorderContainerFooter,
  Content,
  Action
} from 'styles/components'

import {
  RoleVideoContainer,
  ActionIcon,
  ActionButton,
  Informations
} from './Styles'

class RoleOverview extends React.PureComponent {
  render() {
    const {
      pseudonym,
      roleDetails,
      showTargetSelection,
      showRoleInformation,
      skipPhase,
      showRoleCovert,
      currentTarget
    } = this.props

    const activeIcon = ACTIVE_ICONS[roleDetails.get('active')]
    const roleVideo = getVideoByRole(roleDetails.get('name'))
    const roleImage = getImageByRole(roleDetails.get('name'))

    return (
      <React.Fragment>
        <Content>
          <BorderContainer>
            <BorderContainerTitel onClick={skipPhase}>{roleDetails.get('name')}</BorderContainerTitel>
            <RoleVideoContainer>
              <video autoPlay muted loop="loop" poster={roleImage}>
                <source src={roleVideo} type="video/mp4" />
                <span>Your browser does not support the video tag.</span>
              </video>
            </RoleVideoContainer>
            <Informations>
              <div>Name: <span>{pseudonym}</span></div>
              <div>Next Target: <span>{currentTarget.has('codename') ? currentTarget.get('codename') : '-none-'}</span></div>
            </Informations>
            <BorderContainerFooter>
              <ActionIcon icon={ICONS.help2} onClick={showRoleInformation} />
              <Action onClick={showRoleCovert}>
                hide
              </Action>
              <ActionIcon icon={activeIcon} onClick={showTargetSelection} />
              {/* <ActionButton onClick={skipPhase}>
                skip
              </ActionButton> */}
            </BorderContainerFooter>
          </BorderContainer>
        </Content>
      </React.Fragment>
    )
  }
}

RoleOverview.defaultProps = {
  currentTarget: Map()
}

RoleOverview.propTypes = {
  pseudonym: PropTypes.string.isRequired,
  roleDetails: PropTypes.instanceOf(Map).isRequired,
  showTargetSelection: PropTypes.func.isRequired,
  showRoleInformation: PropTypes.func.isRequired,
  showRoleCovert: PropTypes.func.isRequired,
  skipPhase: PropTypes.func.isRequired,
  currentTarget: PropTypes.instanceOf(Map)
}

export default RoleOverview
