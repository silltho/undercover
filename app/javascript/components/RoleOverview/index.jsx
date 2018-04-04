import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import Button from 'components/Button'
import { ICONS, ACTIVE_ICONS } from 'components/IconFont'
import { getImageByRole } from 'config/roleImages'
import {
  BorderContainer,
  BorderContainerTitel,
  BorderContainerFooter,
  Content
} from 'styles/components'

import {
  RoleImage,
  Action
} from './Styles'

class RoleOverview extends React.PureComponent {
  render() {
    const {
      roleDetails,
      showTargetSelection,
      showRoleInformation,
      skipPhase,
      currentTarget,
      showRoleCovert
    } = this.props

    const activeIcon = ACTIVE_ICONS[roleDetails.get('active')]
    const roleImage = getImageByRole(roleDetails.get('name'))

    return (
      <React.Fragment>
        <Content>
          <BorderContainer>
            <BorderContainerTitel>{roleDetails.get('name')}</BorderContainerTitel>
            <RoleImage background={roleImage} />
            <BorderContainerFooter>
              <Action icon={ICONS.help2} onClick={showRoleInformation} />
              <Button onClick={showRoleCovert}>
                hide
              </Button>
              <Action icon={activeIcon} onClick={showTargetSelection} />
              <Button onClick={skipPhase}>
                skip
              </Button>
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
  roleDetails: PropTypes.instanceOf(Map).isRequired,
  showTargetSelection: PropTypes.func.isRequired,
  showRoleInformation: PropTypes.func.isRequired,
  showRoleCovert: PropTypes.func.isRequired,
  skipPhase: PropTypes.func.isRequired,
  currentTarget: PropTypes.instanceOf(Map)
}

export default RoleOverview
