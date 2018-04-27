import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import IconFont, { ICONS } from 'components/IconFont'
import { getVideoByRole, getImageByRole } from 'config/roleImages'
import { getImageByFraction } from 'config/fractionImages'
import CornerButton from 'components/CornerButton'
import {
  BorderContainer,
  BorderContainerTitel,
  Content
} from 'styles/components'
import PlayerStates from 'config/playerStates'

import {
  RoleVideoContainer,
  CardHead,
  InformationIcon,
  FractionImage
} from './Styles'


import CardBottom from './CardBottom'

class RoleOverview extends React.PureComponent {
  render() {
    const {
      player,
      showRoleInformation,
      skipPhase,
      showTargetSelection,
      currentTarget
    } = this.props

    const roleDetails = player.get('role', Map())
    const pseudonym = player.get('codename')
    const state = player.get('state')

    const roleVideo = getVideoByRole(roleDetails.get('name'))
    const roleImage = getImageByRole(roleDetails.get('name'))
    const fractionImage = getImageByFraction(player.get('party'))

    return (
      <React.Fragment>
        <Content>
          <BorderContainer>
            <BorderContainerTitel>
              <span>{roleDetails.get('name')}</span>
            </BorderContainerTitel>
            <CardHead>
              <span>{pseudonym}</span>
            </CardHead>
            <FractionImage src={fractionImage} />
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
            <CardBottom
              player={player}
              showTargetSelection={showTargetSelection}
              currentTarget={currentTarget}
            />
          </BorderContainer>
          { state === PlayerStates.ALIVE &&
          <CornerButton right bottom onClickAction={skipPhase}>
            <IconFont icon={ICONS.checkmark} />
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
  skipPhase: PropTypes.func.isRequired,
  currentTarget: PropTypes.instanceOf(Map)
}

export default RoleOverview
