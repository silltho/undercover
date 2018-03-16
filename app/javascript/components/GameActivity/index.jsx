import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import TargetSelection from 'components/TargetSelection'
import RoleOverview from 'components/RoleOverview'

class GameActivity extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showTargetSelection: false,
      selectedTarget: false
    }
  }

  selectTarget = (targetId) => {
    this.setState({ selectedTarget: targetId })
    this.props.useSkill(targetId)
    this.hideTargetSelection()
  }

  showTargetSelection = () => {
    this.setState({ showTargetSelection: true })
  }

  hideTargetSelection = () => {
    this.setState({ showTargetSelection: false })
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

    return this.state.showTargetSelection ?
      <TargetSelection
        player={player}
        victims={victims}
        onSelectTarget={this.selectTarget}
        onRequestHide={this.hideTargetSelection}
        currentTarget={currentTarget}
      /> :
      <RoleOverview
        roleDetails={player.get('role')}
        showTargetSelection={this.showTargetSelection}
        skipPhase={allSkillsUsed}
        currentTarget={currentTarget}
      />
  }
}

GameActivity.propTypes = {
  game: PropTypes.instanceOf(Map).isRequired,
  player: PropTypes.instanceOf(Map).isRequired,
  useSkill: PropTypes.func.isRequired,
  allSkillsUsed: PropTypes.func.isRequired
}

export default GameActivity
