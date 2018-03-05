import React from 'react'
import { List } from 'immutable'
import PropTypes from 'prop-types'
import {
  Wrapper,
  PlayerItem,
  PlayerList
} from './Styles'

class PlayersList extends React.PureComponent {
  renderPlayer = (player) => (
    <PlayerItem
      key={`player_${player.get('id')}`}
    >
      {player.get('codename')}
    </PlayerItem>
  )

  render() {
    const renderedPlayers = this.props.players.map((player) => this.renderPlayer(player))

    return (
      <Wrapper>
        <div>
          <u>Town Population:</u>
        </div>
        <PlayerList>
          {renderedPlayers}
        </PlayerList>
      </Wrapper>
    )
  }
}

PlayersList.defaultProps = {
  players: List()
}

PlayersList.propTypes = {
  players: PropTypes.instanceOf(List)
}

export default PlayersList
