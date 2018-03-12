import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import TargetSelection from 'components/TargetSelection'
import RoleOverview from 'components/RoleOverview'

class GameActivity extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showTargetSelection: false
    }
  }

  showTargetSelection = () => {
    this.setState({ showTargetSelection: true })
  }

  hideTargetSelection = () => {
    this.setState({ showTargetSelection: false })
  }

  render() {
    const {
      useSkill,
      player,
      game
    } = this.props

    const victims = game.get('players')

    return (
      <React.Fragment>
        {this.state.showTargetSelection ?
          <TargetSelection
            player={player}
            victims={victims}
            useSkill={useSkill}
            onRequestHide={this.hideTargetSelection}
          /> :
          <RoleOverview
            roleDetails={player.get('role')}
            showTargetSelection={this.showTargetSelection}
            skipPhase={useSkill}
          />
        }
      </React.Fragment>
    )
  }
}

GameActivity.propTypes = {
  game: PropTypes.instanceOf(Map).isRequired,
  player: PropTypes.instanceOf(Map).isRequired,
  useSkill: PropTypes.func.isRequired
}

export default GameActivity
