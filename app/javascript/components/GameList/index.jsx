import React from 'react'
import PropTypes from 'prop-types'
import {
  Subheader,
  List,
  ListItem,
  IconButton
} from 'material-ui'
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh'
import {
  PlayerCount,
  SubHeaderWrapper
} from './Styles'

class GameList extends React.PureComponent {
  refreshOpenGames = () => {
    this.props.onGetOpenGames()
  }

  renderGame = (game) => (
    <ListItem
      key={`game_${game.id}`}
      primaryText={game.title}
      rightIcon={<PlayerCount>8/8</PlayerCount>}
      onClick={() => this.props.joinGame(game.id)}
    />
  )

  render() {
    const openGames = this.props.openGames.map((game) => this.renderGame(game))

    return (
      <List>
        <Subheader>
          <SubHeaderWrapper>
            <div onClick={this.refreshOpenGames}>Open Games</div>
            <IconButton tooltip="Refresh Open Games">
              <RefreshIcon onClick={this.refreshOpenGames} />
            </IconButton>
          </SubHeaderWrapper>
        </Subheader>
        {openGames.length > 0 ? openGames : '<ListItem primaryText="keine Games gefunden :(" />'}
      </List>
    )
  }
}

GameList.propTypes = {
  openGames: PropTypes.array.isRequired,
  onGetOpenGames: PropTypes.func.isRequired,
  joinGame: PropTypes.func.isRequired
}

export default GameList
