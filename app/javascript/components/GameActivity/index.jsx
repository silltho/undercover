import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'

class GameActivity extends React.PureComponent {

  render() {
    const {
      roleDetails,
      endGame
    } = this.props
    return (
      <div>
        <div>{roleDetails.toJS().toString()}</div>
        <button onClick={endGame}>Exit</button>
      </div>
    )
  }
}

GameActivity.propTypes = {
	roleDetails: PropTypes.instanceOf(Map).isRequired,
  endGame: PropTypes.func.isRequired
}

export default GameActivity
