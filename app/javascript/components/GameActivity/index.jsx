import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import TargetSelection from 'components/TargetSelection'
import RoleOverview from 'components/RoleOverview'
import RoleInformation from 'components/RoleInformation'
import RoleCovert from 'components/RoleCovert'
import Flip from 'components/Animations/Flip'
import { Wrapper } from './Styles'

export const VIEWS = {
  roleOverview: 'ROLE_OVERVIEW',
  roleInformation: 'ROLE_INFORMATION',
  targetSelection: 'TARGET_SELECTION',
  roleCovert: 'ROLE_COVERT'
}

class GameActivity extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      currentView: VIEWS.roleOverview,
      selectedTarget: false
    }
  }

  selectTarget = (targetId) => {
    this.setState({ selectedTarget: targetId })
    this.props.useSkill(targetId)
    this.showRoleOverview()
  }

  showTargetSelection = () => {
    this.setState({ currentView: VIEWS.targetSelection })
  }

  showRoleOverview = () => {
    this.setState({ currentView: VIEWS.roleOverview })
  }

  showRoleInformation = () => {
    this.setState({ currentView: VIEWS.roleInformation })
  }
  showRoleCovert = () => {
    this.setState({ currentView: VIEWS.roleCovert })
  }

  renderCard = () => {
    const {
      player,
      game,
      useSkill
    } = this.props

    const victims = game.get('players')
    const currentTargetIndex = victims.findIndex((victim) => victim.get('id') === this.state.selectedTarget)
    const currentTarget = currentTargetIndex >= 0 ? victims.get(currentTargetIndex) : Map()

    switch (this.state.currentView) {
      default:
      case VIEWS.roleOverview: return (
        <Wrapper key="role-overview">
          <RoleOverview
            player={player}
            showTargetSelection={this.showTargetSelection}
            showRoleInformation={this.showRoleInformation}
            showRoleCovert={this.showRoleCovert}
            skipPhase={() => useSkill(null)}
            currentTarget={currentTarget}
          />
        </Wrapper>
      )
      case VIEWS.roleInformation: return (
        <Wrapper key="role-information">
          <RoleInformation
            roleDetails={player.get('role')}
            onRequestHide={this.showRoleOverview}
          />
        </Wrapper>
      )
      case VIEWS.targetSelection: return (
        <Wrapper key="target-selection">
          <TargetSelection
            player={player}
            victims={victims}
            onSelectTarget={this.selectTarget}
            onRequestHide={this.showRoleOverview}
            currentTarget={currentTarget}
          />
        </Wrapper>
      )
      case VIEWS.roleCovert: return (
        <Wrapper key="role-covert">
          <RoleCovert
            onRequestHide={this.showRoleOverview}
          />
        </Wrapper>
      )
    }
  }

  render() {
    return (
      <Flip>
        {this.renderCard()}
      </Flip>
    )
  }
}

GameActivity.propTypes = {
  game: PropTypes.instanceOf(Map).isRequired,
  player: PropTypes.instanceOf(Map).isRequired,
  useSkill: PropTypes.func.isRequired
}

export default GameActivity
