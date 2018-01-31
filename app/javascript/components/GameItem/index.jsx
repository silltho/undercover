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

  renderPlayerSlots = (players) => {
    const slots = players.map(() => (<PlayerSlot full />))
    while (slots.length < 8) {
      slots.push(<PlayerSlot />)
    }
    return slots
  }

  render() {
    const {
      game
    } = this.props
    console.log(game.toJS())

    return (
      <Wrapper onClick={this.joinGame}>
        <GameTitle>
          {game.get('title')}
        </GameTitle>
        <GameInfo>
          <PlayerSlotWrapper>
            {this.renderPlayerSlots(game.get('players'))}
          </PlayerSlotWrapper>
          <GameStatus>
            private
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
