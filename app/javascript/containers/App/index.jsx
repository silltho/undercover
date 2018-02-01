import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import Dashboard from 'containers/Dashboard'
import Lobby from 'containers/Lobby'
import Header from 'components/Header'
import Game from 'containers/Game'
import { AppContainer } from './Styles'

class App extends React.PureComponent {
  render() {
    return (
      <AppContainer>
        <Header />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/lobby" component={Lobby} />
          <Route path="/game" component={Game} />
        </Switch>
      </AppContainer>
    )
  }
}

export const mapDispatchToProps = () => ({})

const mapStateToProps = () => ({})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))
