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
      roleDetails,
      useSkill
    } = this.props

    return (
      <React.Fragment>
        {this.state.showTargetSelection ?
          <TargetSelection
            roleDetails={roleDetails}
            players={roleDetails}
            useSkill={useSkill}
            onRequestHide={this.hideTargetSelection}
          /> :
          <RoleOverview
            roleDetails={roleDetails}
            showTargetSelection={this.showTargetSelection}
            skipPhase={useSkill}
          />
        }
      </React.Fragment>
    )
  }
}

GameActivity.propTypes = {
  roleDetails: PropTypes.instanceOf(Map).isRequired,
  useSkill: PropTypes.func.isRequired
}

export default GameActivity
