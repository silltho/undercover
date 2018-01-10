import React from 'react'
import PropTypes from 'prop-types'

class GameExchange extends React.PureComponent {

  render() {
	  const {
		  endExchange
	  } = this.props

    return (
      <div>
        Austauschphase
        <button onClick={endExchange}>Fertig</button>
      </div>
    )
  }
}

GameExchange.propTypes = {
	endExchange: PropTypes.func.isRequired
}

export default GameExchange
