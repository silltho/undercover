import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Home from 'containers/Home'
import Lobby from 'containers/Lobby'
import Nav from 'components/Nav'
import Game from 'components/Game'

class App extends React.PureComponent {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/lobby" component={Lobby} />
            <Route path="/game" component={Game} />
          </Switch>
        </div>
      </MuiThemeProvider>
    )
  }
}

export const mapDispatchToProps = () => ({})

const mapStateToProps = () => ({})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))
