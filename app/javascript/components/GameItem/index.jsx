import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import {
  Wrapper,
  GameTitle
} from './Styles'

class GameItem extends React.PureComponent {
  joinGame = () => {
    this.props.joinGame(this.props.game.get('id'))
  }

  render() {
    const {
      game
    } = this.props

    return (
      <Wrapper onClick={this.joinGame}>
        <GameTitle>
          {game.get('title')}
        </GameTitle>
      </Wrapper>
    )
  }
}

GameItem.propTypes = {
  game: PropTypes.instanceOf(Map),
  joinGame: PropTypes.func.isRequired
}

export default GameItem
