import React from 'react'
import { Map, List } from 'immutable'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  Subheader,
  List as MList,
  ListItem
} from 'material-ui'
import { GameChannel } from 'services/channels'
import { leaveGame } from 'services/actions'

function getGame(state) {
  const gameId = state.getIn(['Lobby', 'gameId'])
  const index = state.get('games').findIndex((game) => game.get('id') === gameId)
  return state.getIn(['games', index])
}

class Lobby extends React.PureComponent {
  leaveGame = () => {
    GameChannel.leaveGame()
	  this.props.history.push('/')
    this.props.leaveGame()
  }

  renderPlayer = (player) => (
    <ListItem
      key={`game_${player.get('id')}`}
      primaryText={player.get('email')}
    />
  )

  render() {
    const { currentGame } = this.props
    console.log('currentGame', currentGame.toJS())
    const players = currentGame.get('players', List()).map(this.renderPlayer)

    return (
      <MList>
        <Subheader>Players:</Subheader>
        {players}
        <button onClick={this.leaveGame}>leave Game</button>
      </MList>
    )
  }
}


Lobby.propTypes = {
  history: PropTypes.object.isRequired,
  currentGame: PropTypes.instanceOf(Map).isRequired,
  leaveGame: PropTypes.func.isRequired
}

export const mapDispatchToProps = (dispatch) => ({
  leaveGame: () => dispatch(leaveGame())
})

const mapStateToProps = (state) => ({
  gameId: state.getIn(['Lobby', 'gameId'], null),
  currentGame: getGame(state)
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Lobby))
