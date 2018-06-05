import React from 'react'
import { Map } from 'immutable'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import FadeIn from 'components/Animations/FadeIn'
import Button from 'components/Button'
import PlayersList from 'components/PlayersList'
import IconFont, { ICONS } from 'components/IconFont'
import showEasterEggs, { getEasterEggsFromCodenames } from 'components/EasterEggs'
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
  ShareButton,
  PlayerCountInfo
} from './Styles'

function getCodenamesFrom(props) {
  return props.game.getIn(['start_info', 'players'])
    .sortBy((p) => p.get('id'))
    .map((p) => p.get('codename', 'undefined').toLowerCase())
}

class Lobby extends React.PureComponent {
  componentDidMount() {
    const codeNames = getCodenamesFrom(this.props)
    const easterEggs = getEasterEggsFromCodenames([codeNames.last()])
    showEasterEggs(easterEggs)
  }

  componentWillReceiveProps(nextProps) {
    const propsCodeNames = getCodenamesFrom(this.props)
    const nextPropsCodeNames = getCodenamesFrom(nextProps)
    const propsEasterEggs = getEasterEggsFromCodenames(propsCodeNames)
    const nextPropsEasterEggs = getEasterEggsFromCodenames(nextPropsCodeNames)
    const newEasterEggs = nextPropsEasterEggs.filter((e) => !propsEasterEggs.includes(e))
    showEasterEggs(newEasterEggs)
  }

  leaveGame = () => {
    this.props.leaveGame(this.props.game.get('id'))
  }

  shareRoomCode = () => {
    const TEXT_WA = 'UNDERCOVER.GG - Roomcode'
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
    const {
      game,
      player
    } = this.props
    const players = game.getIn(['start_info', 'players'])
    const isHost = players.first().get('id') === player.get('id')
    const enoughPlayers = players.size < 5

    return (
      <FadeIn>
        <Header>
          <RoomCode>Roomcode: {game.get('code')}</RoomCode>
          {this.renderShareButton(this.shareRoomCode)}
        </Header>
        <Content>
          {enoughPlayers &&
            <PlayerCountInfo>min 5 players are needed to start a game</PlayerCountInfo>
          }
          <PlayerCount>
            {players.size} Player
          </PlayerCount>
          <PlayersList players={players} currentPlayer={player} showHost />
        </Content>
        <Footer>
          <Button onClick={this.leaveGame} text="leave" />
          {isHost && (enoughPlayers ?
            <Button onClick={() => {}} primary text="min 5 player" /> :
            <Button onClick={this.props.initializeGame} text="start" primary />
          )}
        </Footer>
      </FadeIn>
    )
  }
}

Lobby.propTypes = {
  game: PropTypes.instanceOf(Map).isRequired,
  player: PropTypes.instanceOf(Map).isRequired,
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
  game: state.get('Game'),
  player: state.get('Player')
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lobby)
