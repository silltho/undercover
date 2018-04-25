import React from 'react'
import { Map } from 'immutable'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import FadeIn from 'components/Animations/FadeIn'
import Button from 'components/Button'
import IconFont, { ICONS } from 'components/IconFont'
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
  RoomCode,
  ShareButton
} from './Styles'


class Lobby extends React.PureComponent {
  leaveGame = () => {
    this.props.leaveGame(this.props.game.get('id'))
  }

  shareRoomCode = () => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      const TEXT_WA = 'UNDERCOVER - Roomcode'
      const ROOMCODE = this.props.game.get('code') // get roomcode
      window.location.href = `whatsapp://send?text=${TEXT_WA}:${ROOMCODE}`
    }
    return false
  }

  render() {
    const { game } = this.props

    return (
      <FadeIn>
        <Header>
          <RoomCode>Roomcode: {game.get('code')}</RoomCode>
          <ShareButton onClick={this.shareRoomCode}><IconFont icon={ICONS.share} /></ShareButton>
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
