import React from 'react'
import { List } from 'immutable'
import PropTypes from 'prop-types'

import {
  Subheader,
  List as MList,
  ListItem,
  IconButton
} from 'material-ui'
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh'
import {
  PlayerCount,
  SubHeaderWrapper
} from './Styles'

class OpenGamesList extends React.PureComponent {
  refreshOpenGames = () => {
    this.props.onGetOpenGames()
  }

  renderGame = (game) => (
    <ListItem
      key={`game_${game.get('id')}`}
      primaryText={game.get('title')}
      rightIcon={<PlayerCount>8/8</PlayerCount>}
      onClick={() => this.props.joinGame(game.get('id'))}
    />
  )

  render() {
    const openGames = this.props.openGames.map((game) => this.renderGame(game))

    return (
      <MList>
        <Subheader>
          <SubHeaderWrapper>
            <div onClick={this.refreshOpenGames}>Open Games</div>
            <IconButton tooltip="Refresh Open Games">
              <RefreshIcon onClick={this.refreshOpenGames} />
            </IconButton>
          </SubHeaderWrapper>
        </Subheader>
        {openGames.size > 0 ? openGames : '<ListItem primaryText="keine Games gefunden :(" />'}
      </MList>
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
