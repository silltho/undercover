import React from 'react'
import PropTypes from 'prop-types'
import Footer from 'components/Footer'
import Button from 'components/Button'

class GameInfo extends React.PureComponent {
  render() {
    const {
      readInfos
    } = this.props

    return (
      <div>
        <div>Info-phase</div>
        <Footer>
          <Button onClick={readInfos} text="gelesen" />
        </Footer>
      </div>
    )
  }
}

GameInfo.propTypes = {
  readInfos: PropTypes.func.isRequired
}

export default GameInfo
