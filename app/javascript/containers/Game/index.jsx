import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { List, Map } from 'immutable'
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
  endGame = () => {
    this.props.history.push('/')
  }

  renderCurrentPhase = () => {
    switch (this.props.currentGame.get('aasm_state')) {
      case gamePhases.initialized:
        return (
          <GameStart
            currentPlayer={this.props.currentPlayer}
            players={this.props.players}
            roleDetails={this.props.roleDetails}
            startGame={GameChannel.startGame}
            partyMembers={this.props.partyMembers}
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
            roleDetails={this.props.roleDetails}
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
  history: PropTypes.object.isRequired,
  players: PropTypes.instanceOf(List).isRequired,
  roleDetails: PropTypes.instanceOf(Map).isRequired,
  currentPlayer: PropTypes.instanceOf(Map).isRequired,
  currentGame: PropTypes.instanceOf(Map).isRequired,
  partyMembers: PropTypes.instanceOf(Map).isRequired
}

export const mapDispatchToProps = (dispatch) => ({
})

const mapStateToProps = (state) => ({
  players: state.getIn(['Game', 'players'], List()),
  currentPlayer: state.getIn(['Game', 'current_player'], Map()),
  currentGame: state.getIn(['App', 'currentGame'], Map()),
  roleDetails: state.getIn(['Game', 'role_details'], Map()),
  partyMembers: state.getIn(['Game', 'party_members'], Map()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)
