import React from 'react'
import { Map } from 'immutable'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  DashboardChannel,
  GameChannel
} from 'services/channels'
import { leaveGame } from 'services/actions'
import Button from 'components/Button'
import Footer from 'components/Footer'
import Title from 'components/Title'
import {
  Wrapper,
  PlayerCount
} from './Styles'

class Lobby extends React.PureComponent {
  leaveGame = () => {
    this.props.leaveGame(this.props.game.get('id'))
  }

  render() {
    const { game } = this.props

    return (
      <Wrapper>
        <Title title="Gamelobby" />
        <PlayerCount>
          {game && game.get('players').size} Player
        </PlayerCount>
        <Footer>
          <Button onClick={this.leaveGame} text="exit" />
          <Button onClick={this.props.initializeGame} text="start" />
        </Footer>
      </Wrapper>
    )
  }
}

Lobby.propTypes = {
  game: PropTypes.instanceOf(Map).isRequired,
  leaveGame: PropTypes.func.isRequired,
  initializeGame: PropTypes.func.isRequired
}

export const mapDispatchToProps = (dispatch) => ({
  leaveGame: (gameId) => {
    DashboardChannel.leaveGame(gameId)
    GameChannel.unsubscribe()
    dispatch(leaveGame())
  },
  initializeGame: GameChannel.initializeGame
})

const mapStateToProps = (state) => ({
	game: state.get('Game')
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lobby)
