import React from 'react'
import { List } from 'immutable'
import PropTypes from 'prop-types'
import GameItem from 'components/GameItem'
import Button from 'components/Button'
import Footer from 'components/Footer'
import {
  Wrapper,
  GameList
} from './Styles'

class GamesList extends React.PureComponent {
  renderGame = (game) => (
    <GameItem
      key={`game_${game.get('id')}`}
      joinGame={this.props.joinGame}
      game={game}
    />
  )

  render() {
    const openGames = this.props.openGames.map((game) => this.renderGame(game))

    return (
      <Wrapper>
        <GameList>
          {openGames.size > 0 ? openGames : (<div>keine Games gefunden :(</div>)}
        </GameList>
        <Footer>
          <Button onClick={this.props.openStartNewGame} text="create new game" />
        </Footer>
      </Wrapper>
    )
  }
}

GamesList.defaultProps = {
  openGames: List()
}

GamesList.propTypes = {
  openGames: PropTypes.instanceOf(List),
  onGetOpenGames: PropTypes.func.isRequired,
  joinGame: PropTypes.func.isRequired,
	openStartNewGame: PropTypes.func.isRequired
}

export default GamesList
