import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import { Wrapper } from './Styles'

class GameActivity extends React.PureComponent {

  render() {
    const {
      roleDetails,
      endGame
    } = this.props

    return (
      <Wrapper background={roleDetails.get('image')}>
        <div>{roleDetails.get('name')}</div>
        <button onClick={endGame}>Exit</button>
      </Wrapper>
    )
  }
}

GameActivity.propTypes = {
	roleDetails: PropTypes.instanceOf(Map).isRequired,
  endGame: PropTypes.func.isRequired
}

export default GameActivity
