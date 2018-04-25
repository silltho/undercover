import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import IconFont, { ICONS, ACTIVE_ICONS } from 'components/IconFont'
import { getVideoByRole, getImageByRole } from 'config/roleImages'
import CornerButton from 'components/CornerButton'
import {
  BorderContainer,
  BorderContainerTitel,
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
            </CardHead>
            <RoleVideoContainer
              dead={state === PlayerStates.DEAD}
              imprisoned={state === PlayerStates.IMPRISONED}
            >
              <video autoPlay muted loop="loop" poster={roleImage} controlsList="nodownload nofullscreen">
                <source src={roleVideo} type="video/mp4" />
                <span>Your browser does not support the video tag.</span>
              </video>
              <InformationIcon icon={ICONS.help1} onClick={showRoleInformation} />
            </RoleVideoContainer>
            <CardBottom>
              { state === PlayerStates.ALIVE &&
                <ActionIcon icon={activeIcon} onClick={showTargetSelection} />
              }
              <span>{currentTarget.has('codename') ? currentTarget.get('codename') : '-none-'}</span>
              <ActionIcon icon={activeIcon} onClick={showTargetSelection} />
            </CardBottom>
          </BorderContainer>
          { state === PlayerStates.ALIVE &&
          <CornerButton right bottom onClickAction={skipPhase}>
            <IconFont icon={ICONS.ready} />
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
