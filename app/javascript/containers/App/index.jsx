import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import { connect } from 'react-redux'
import { GameChannel } from 'services/channels'
import Dashboard from 'containers/Dashboard'
import Lobby from 'containers/Lobby'
import Game from 'containers/Game'
import { AppContainer } from './Styles'

class App extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      component: <Dashboard />
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.game.has('code') && nextProps.game.has('code')) {
      GameChannel.joinGameChannel(nextProps.game.get('code'))
    }
    if (!nextProps.game.has('id')) {
      this.setState({ component: <Dashboard /> })
    }
    if (nextProps.game.has('aasm_state') && nextProps.game.get('aasm_state') === 'waiting') {
      this.setState({ component: <Lobby /> })
    }
    if (nextProps.game.has('aasm_state') && nextProps.game.get('aasm_state') !== 'waiting') {
      this.setState({ component: <Game /> })
    }
  }

  render() {
    return (
      <AppContainer>
        {this.state.component}
      </AppContainer>
    )
  }
}

App.propTypes = {
  game: PropTypes.instanceOf(Map).isRequired
}

export const mapDispatchToProps = () => ({})

const mapStateToProps = (state) => ({
  game: state.get('Game')
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
