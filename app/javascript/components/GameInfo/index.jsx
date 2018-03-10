import React from 'react'
import PropTypes from 'prop-types'
import Header from 'components/Header'
import Content from 'components/Content'
import Footer from 'components/Footer'
import Button from 'components/Button'

class GameInfo extends React.PureComponent {
  render() {
    const {
      round,
      readInfos
    } = this.props

    return (
      <React.Fragment>
        <Header>
          Tag {round}
        </Header>
        <Content>
          <div>Info-phase</div>
          <div>Info-phase</div>
          <div>Info-phase</div>
          <div>Info-phase</div>
          <div>Info-phase</div>
          <div>Info-phase</div>
          <div>Info-phase</div>
          <div>Info-phase</div>
          <div>Info-phase</div>
          <div>Info-phase</div>
          <div>Info-phase</div>
          <div>Info-phase</div>
          <div>Info-phase</div>
        </Content>
        <Footer>
          <Button onClick={readInfos} text="gelesen" />
        </Footer>
      </React.Fragment>
    )
  }
}

GameInfo.defaultProps = {
  round: 0
}

GameInfo.propTypes = {
  round: PropTypes.number,
  readInfos: PropTypes.func.isRequired
}

export default GameInfo
