import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import TargetSelection from 'components/TargetSelection'
import RoleOverview from 'components/RoleOverview'
import RoleInformation from 'components/RoleInformation'

export const VIEWS = {
  roleOverview: 'ROLE_OVERVIEW',
  roleInformation: 'ROLE_INFORMATION',
  targetSelection: 'TARGET_SELECTION'
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
  render() {
    const {
      player,
      game,
      allSkillsUsed
    } = this.props

    const victims = game.get('players')
    const currentTargetIndex = victims.findIndex((victim) => victim.get('id') === this.state.selectedTarget)
    const currentTarget = currentTargetIndex >= 0 ? victims.get(currentTargetIndex) : Map()

    switch (this.state.currentView) {
      default:
      case VIEWS.roleOverview:
        return (
          <RoleOverview
            roleDetails={player.get('role')}
            showTargetSelection={this.showTargetSelection}
            showRoleInformation={this.showRoleInformation}
            skipPhase={allSkillsUsed}
            currentTarget={currentTarget}
          />
        )
      case VIEWS.roleInformation: return (
        <RoleInformation
          roleDetails={player.get('role')}
          onRequestHide={this.showRoleOverview}
        />
      )
      case VIEWS.targetSelection: return (
        <TargetSelection
          player={player}
          victims={victims}
          onSelectTarget={this.selectTarget}
          onRequestHide={this.showRoleOverview}
          currentTarget={currentTarget}
        />
      )
    }
  }
}

GameActivity.propTypes = {
  game: PropTypes.instanceOf(Map).isRequired,
  player: PropTypes.instanceOf(Map).isRequired,
  useSkill: PropTypes.func.isRequired,
  allSkillsUsed: PropTypes.func.isRequired
}

export default GameActivity
