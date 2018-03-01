import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import { connect } from 'react-redux'
import Dashboard from 'containers/Dashboard'
import Lobby from 'containers/Lobby'
import Header from 'components/Header'
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
    if (nextProps.game.has('aasm_state') && nextProps.game.get('aasm_state') === 'waiting') {
      this.setState({
        component: <Lobby />
      })
    }
    if (nextProps.game.has('aasm_state') && nextProps.game.get('aasm_state') !== 'waiting') {
	    this.setState({
		    component: <Game />
	    })
    }
  }

  render() {
    return (
      <AppContainer>
        <Header />
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
