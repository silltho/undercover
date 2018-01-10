import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { UserChannel } from 'services'
// import GameList from 'components/GameList'
// import Nav from 'components/Nav'
import Game from 'components/Game'

class App extends React.PureComponent {
  render() {
    return (
      <MuiThemeProvider>
        <Game />
        {/* <div>
          <Nav />
          <GameList
            openGames={this.props.games}
            onGetOpenGames={this.props.getOpenGames}
          />
        </div> */}
      </MuiThemeProvider>
    )
  }
}

App.propTypes = {
  games: PropTypes.array.isRequired,
  getOpenGames: PropTypes.func.isRequired
}

export const mapDispatchToProps = () => ({
  getOpenGames: UserChannel.getOpenGames
})

const mapStateToProps = (state) => ({
  games: state.games || []
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
