import React from 'react'
import PropTypes from 'prop-types'
import Header from 'components/Header'
import Content from 'components/Content'
import Footer from 'components/Footer'
import Button from 'components/Button'

class GameExchange extends React.PureComponent {
  render() {
    const {
      endExchange
    } = this.props

    return (
      <React.Fragment>
        <Content>
          <div>Austausch-phase</div>
        </Content>
        <Footer>
          <Button onClick={endExchange} text="done" />
        </Footer>
      </React.Fragment>
    )
  }
}

GameExchange.propTypes = {
  endExchange: PropTypes.func.isRequired
}

export default GameExchange
