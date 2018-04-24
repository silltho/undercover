import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import { ICONS, ACTIVE_ICONS } from 'components/IconFont'
import { getVideoByRole, getImageByRole } from 'config/roleImages'
import {
  BorderContainer,
  BorderContainerTitel,
  CornerButton,
  Content
} from 'styles/components'
import PlayerStates from 'config/playerStates'

import {
  RoleVideoContainer,
  ActionIcon,
  CardBottom,
  CardHead,
  InformationIcon,
  FlipIcon
} from './Styles'

class RoleOverview extends React.PureComponent {
  render() {
    const {
      player,
      showTargetSelection,
      showRoleInformation,
      skipPhase,
      showRoleCovert,
      currentTarget
    } = this.props

    const roleDetails = player.get('role', Map())
    const pseudonym = player.get('codename')
    const state = player.get('state')

    const activeIcon = ACTIVE_ICONS[roleDetails.get('active')]
    const roleVideo = getVideoByRole(roleDetails.get('name'))
    const roleImage = getImageByRole(roleDetails.get('name'))

    return (
      <React.Fragment>
        <Content>
          <BorderContainer>
            <BorderContainerTitel>{roleDetails.get('name')}</BorderContainerTitel>
            <CardHead>
              <span>{pseudonym}</span>
              <InformationIcon icon={ICONS.help2} onClick={showRoleInformation} />
            </CardHead>
            <RoleVideoContainer
              dead={state === PlayerStates.DEAD}
              imprisoned={state === PlayerStates.IMPRISONED}
            >
              <video autoPlay muted loop="loop" poster={roleImage} controlsList="nodownload nofullscreen">
                <source src={roleVideo} type="video/mp4" />
                <span>Your browser does not support the video tag.</span>
              </video>
            </RoleVideoContainer>
            <CardBottom>
              <FlipIcon icon={ICONS.arrow_left} onClick={showRoleCovert} />
              { state === PlayerStates.ALIVE &&
                <ActionIcon icon={activeIcon} onClick={showTargetSelection} />
              }
              <span>{currentTarget.has('codename') ? currentTarget.get('codename') : '-none-'}</span>
              <ActionIcon icon={activeIcon} onClick={showTargetSelection} />
            </CardBottom>
          </BorderContainer>
          { state === PlayerStates.ALIVE &&
          <CornerButton right bottom onClick={skipPhase}>
            <ActionIcon icon={ICONS.arrow_right} />
          </CornerButton>
          }
        </Content>
      </React.Fragment>
    )
  }
}

RoleOverview.defaultProps = {
  currentTarget: Map()
}

RoleOverview.propTypes = {
  player: PropTypes.instanceOf(Map).isRequired,
  showTargetSelection: PropTypes.func.isRequired,
  showRoleInformation: PropTypes.func.isRequired,
  showRoleCovert: PropTypes.func.isRequired,
  skipPhase: PropTypes.func.isRequired,
  currentTarget: PropTypes.instanceOf(Map)
}

export default RoleOverview
