import React from 'react'
import { Map } from 'immutable'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  UserChannel,
  GameChannel
} from 'services/channels'
import Button from 'components/Button'
import Footer from 'components/Footer'
import Title from 'components/Title'
import {
  Wrapper,
  PlayerCount,
  RoomCode
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
        <RoomCode>Roomcode: {game.get('code')}</RoomCode>
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

export const mapDispatchToProps = () => ({
  leaveGame: (gameId) => {
    UserChannel.leaveGame(gameId)
    GameChannel.unsubscribe()
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
