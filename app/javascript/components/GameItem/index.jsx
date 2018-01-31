import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import {
  Wrapper,
  GameTitle,
  GameStatus,
  GameInfo,
  PlayerSlot,
  PlayerSlotWrapper
} from './Styles'

class GameItem extends React.PureComponent {
  joinGame = () => {
    this.props.joinGame(this.props.game.get('id'))
  }

  renderPlayerSlots = (players = []) => {
    const slots = []
    for (let i = 0; i < 17; i += 1) {
      const key = `game_${this.props.game.get('id')}_slot_${i}`
      slots.push(<PlayerSlot key={key} full={players.get(i)} />)
    }
    return slots
  }

  render() {
    const {
      game
    } = this.props

    return (
      <Wrapper onClick={this.joinGame}>
        <GameTitle closed={game.get('full')}>
          {game.get('title')}
        </GameTitle>
        <GameInfo>
          <PlayerSlotWrapper>
            {this.renderPlayerSlots(game.get('users'))}
          </PlayerSlotWrapper>
          <GameStatus>
            {game.get('full') ? 'closed' : 'open'}
          </GameStatus>
        </GameInfo>
      </Wrapper>
    )
  }
}

GameItem.propTypes = {
  game: PropTypes.instanceOf(Map),
  joinGame: PropTypes.func.isRequired
}

export default GameItem
