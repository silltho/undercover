import React from 'react'
import PropTypes from 'prop-types'

class GameActivity extends React.PureComponent {

  render() {
    const {
      useActivity
    } = this.props
    return (
      <div>
        Aktivität
        <button onClick={useActivity}>Aktivität verwenden</button>
      </div>
    )
  }
}

GameActivity.propTypes = {
	useActivity: PropTypes.func.isRequired
}

export default GameActivity
