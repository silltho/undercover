import React from 'react'
import { Map } from 'immutable'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import FadeIn from 'components/Animations/FadeIn'
import Button from 'components/Button'
import PlayersList from 'components/PlayersList'
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
    const TEXT_WA = 'UNDERCOVER - Roomcode'
    const ROOMCODE = this.props.game.get('code') // get roomcode
    window.location.href = `whatsapp://send?text=${TEXT_WA}:${ROOMCODE}`
  }

  renderShareButton = (clickHandle) => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      return (<ShareButton onClick={clickHandle}><IconFont icon={ICONS.share} /></ShareButton>)
    }
    return false
  }

  render() {
    const { game } = this.props
    const players = game.getIn(['start_info', 'players'])

    return (
      <FadeIn>
        <Header>
          <RoomCode>Roomcode: {game.get('code')}</RoomCode>
          {this.renderShareButton(this.shareRoomCode)}
        </Header>
        <Content>
          <PlayerCount>
            {players.size} Player
          </PlayerCount>
          <PlayersList players={players} />
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
