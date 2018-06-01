import React from 'react'
import { List, Map } from 'immutable'
import PropTypes from 'prop-types'
import IconFont, { ICONS } from 'components/IconFont'
import {
  Wrapper,
  PlayerItem,
  PlayerList
} from './Styles'

class PlayersList extends React.PureComponent {
  renderPlayer = (player) => {
    const isCurrentPlayer = player.get('id') === this.props.currentPlayer.get('id', false)
    const isHost = player.get('id') === this.props.players.first().get('id')
    return (
      <PlayerItem
        key={`player_${player.get('id')}`}
        isCurrentPlayer={isCurrentPlayer}
      >
        {this.props.showHost && isHost && <IconFont icon={ICONS.certificate} />}
        {player.get('codename')}
      </PlayerItem>
    )
  }

  render() {
    const renderedPlayers = this.props.players.map((player) => this.renderPlayer(player))

    return (
      <Wrapper>
        <PlayerList>
          {renderedPlayers}
        </PlayerList>
      </Wrapper>
    )
  }
}

PlayersList.defaultProps = {
  showHost: false,
  currentPlayer: Map(),
  players: List()
}

PlayersList.propTypes = {
  showHost: PropTypes.bool,
  currentPlayer: PropTypes.instanceOf(Map),
  players: PropTypes.instanceOf(List)
}

export default PlayersList
