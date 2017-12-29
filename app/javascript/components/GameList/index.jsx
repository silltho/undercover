import React from 'react'
import PropTypes from 'prop-types'
import {
  Wrapper,
  GameItem
} from './Styles'

class GameList extends React.PureComponent {
  refreshOpenGames = () => {
    this.props.onGetOpenGames()
  }

  renderGame = (game) => (
    <GameItem key={game.id}>{game.title}</GameItem>
  )

  render() {
    const openGames = this.props.openGames.map((game) => this.renderGame(game))

    return (
      <Wrapper>
        <button onClick={this.refreshOpenGames}>refresh</button>
        {openGames.length > 0 ? openGames : 'keine Games gefunden :('}
      </Wrapper>
    )
  }
}

GameList.propTypes = {
  openGames: PropTypes.array.isRequired,
  onGetOpenGames: PropTypes.func.isRequired
}

export default GameList
