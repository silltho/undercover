import React from 'react'
import PropTypes from 'prop-types'
import Footer from 'components/Footer'
import Button from 'components/Button'

class GameExchange extends React.PureComponent {

  render() {
    const {
      endExchange
    } = this.props

    return (
      <div>
        <div>Austausch-phase</div>
        <Footer>
          <Button onClick={endExchange} text="fertig" />
        </Footer>
      </div>
    )
  }
}

GameExchange.propTypes = {
  endExchange: PropTypes.func.isRequired
}

export default GameExchange
