import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Map } from 'immutable'
import { GameChannel } from 'services/channels'
import GameStart from 'components/GameStart'
import GameInfo from 'components/GameInfo'
import GameExchange from 'components/GameExchange'
import GameActivity from 'components/GameActivity'

const gamePhases = {
  waiting: 'waiting',
  info: 'inform',
  exchange: 'exchange',
  activity: 'activity',
  initialized: 'initialized'
}

class Game extends React.PureComponent {
  renderCurrentPhase = () => {
    switch (this.props.game.get('aasm_state')) {
      case gamePhases.initialized:
        return (
          <GameStart
            game={this.props.game}
            player={this.props.player}
            startGame={GameChannel.startGame}
          />
        )
      case gamePhases.info:
        return (
          <GameInfo
            day={1}
            readInfos={GameChannel.endInfoPhase}
          />
        )
      case gamePhases.exchange:
        return (
          <GameExchange
            endExchange={GameChannel.endExchangePhase}
          />
        )
      case gamePhases.activity:
        return (
          <GameActivity
            endGame={GameChannel.useSkill}
            roleDetails={this.props.player.get('role')}
          />
        )
      default:
        return (<div>game is in a unknown state</div>)
    }
  }

  render() {
    return this.renderCurrentPhase()
  }
}

Game.propTypes = {
	game: PropTypes.instanceOf(Map).isRequired,
	player: PropTypes.instanceOf(Map).isRequired
}

export const mapDispatchToProps = (dispatch) => ({})

const mapStateToProps = (state) => ({
  game: state.get('Game'),
  player: state.get('Player')
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)
