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
import Content from 'components/Content'
import Header from 'components/Header'
import {
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
      <React.Fragment>
        <Header>
          <RoomCode>Roomcode: {game.get('code')}</RoomCode>
        </Header>
        <Content>
          <PlayerCount>
            {game && game.get('players').size} Player
          </PlayerCount>
        </Content>
        <Footer>
          <Button onClick={this.leaveGame} text="leave" />
          <Button onClick={this.props.initializeGame} text="start" />
        </Footer>
      </React.Fragment>
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
