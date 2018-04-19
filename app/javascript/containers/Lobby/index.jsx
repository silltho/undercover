import React from 'react'
import { Map } from 'immutable'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import FadeIn from 'components/Animations/FadeIn'
import Button from 'components/Button'
import {
  UserChannel,
  GameChannel
} from 'services/channels'
import {
  Content,
  Header,
  Footer
} from 'styles/components'
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
      <FadeIn>
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
      </FadeIn>
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
