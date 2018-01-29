import React from 'react'
import { List } from 'immutable'
import PropTypes from 'prop-types'

class OpenGamesList extends React.PureComponent {
  refreshOpenGames = () => {
    this.props.onGetOpenGames()
  }

  renderGame = (game) => (
    <li
      key={`game_${game.get('id')}`}
      onClick={() => this.props.joinGame(game.get('id'))}
    >
      {game.get('title')}
    </li>
  )

  render() {
    const openGames = this.props.openGames.map((game) => this.renderGame(game))

    return (
      <div>
        {openGames.size > 0 ? openGames : '<ListItem primaryText="keine Games gefunden :(" />'}
      </div>
    )
  }
}

OpenGamesList.defaultProps = {
  openGames: List()
}

OpenGamesList.propTypes = {
  openGames: PropTypes.instanceOf(List),
  onGetOpenGames: PropTypes.func.isRequired,
  joinGame: PropTypes.func.isRequired
}

export default OpenGamesList
