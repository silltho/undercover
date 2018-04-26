import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Map } from 'immutable'
import { GameChannel } from 'services/channels'
import {
  RoomCode
} from 'styles/components'
import {
  resetGameAction,
  hidePlayerInformationsAction
} from 'services/actions'
import GamePhases from 'config/gamePhases'
import FadeIn from 'components/Animations/FadeIn'
import SlideInOut from 'components/Animations/SlideInOut'
import GameStart from 'components/GameStart'
import GameInfo from 'components/GameInfo'
import GameExchange from 'components/GameExchange'
import GameActivity from 'components/GameActivity'
import GameEnd from 'components/GameEnd'
import PlayerInformationModal from 'components/PlayerInformationModal'
import GamePhaseWrapper from 'components/GamePhaseWrapper'

class Game extends React.PureComponent {
  renderCurrentPhase = () => {
    switch (this.props.game.get('aasm_state')) {
      case GamePhases.INITIALIZED:
        return (
          <GameStart
            game={this.props.game}
            player={this.props.player}
            startGame={this.props.startGame}
          />)
      case GamePhases.INFO:
        return (
          <GameInfo
            player={this.props.player}
            game={this.props.game}
            round={this.props.game.get('round') || 0}
            roundInformation={this.props.roundInformation}
            readInfos={this.props.endInfoPhase}
          />)
      case GamePhases.EXCHANGE:
        return (
          <GameExchange
            player={this.props.player}
            endExchange={this.props.endExchangePhase}
          />)
      case GamePhases.ACTIVITY:
        return (
          <GameActivity
            useSkill={this.props.useSkill}
            player={this.props.player}
            game={this.props.game}
          />)
      case GamePhases.FINISHED:
        return (
          <GameEnd
            endInformation={this.props.endInformation}
            resetGame={this.props.resetGame}
          />)
      default:
        return (<div>game is in a unknown state</div>)
    }
  }

  render() {
    const {
      app,
      hidePlayerInformations
    } = this.props
    const showPlayerInformationModal = app.get('showPlayerInformation')
    const ready = app.get('showWaitForOpponents')
    const gamePhaseKey = this.props.game.get('aasm_state')
    const gameCode = this.props.game.get('code')

    return (
      <FadeIn>
        <SlideInOut>
          <GamePhaseWrapper ready={ready} phaseKey={`phase-${gamePhaseKey}`}>
            {this.renderCurrentPhase()}
          </GamePhaseWrapper>
          <RoomCode>ROOMCODE: {gameCode}</RoomCode>
        </SlideInOut>
        {showPlayerInformationModal &&
          <PlayerInformationModal
            playerInformation={this.props.playerInformation}
            onRequestHide={hidePlayerInformations}
          />
        }
      </FadeIn>
    )
  }
}

Game.propTypes = {
  app: PropTypes.instanceOf(Map).isRequired,
  game: PropTypes.instanceOf(Map).isRequired,
  player: PropTypes.instanceOf(Map).isRequired,
  roundInformation: PropTypes.instanceOf(Map).isRequired,
  playerInformation: PropTypes.instanceOf(Map).isRequired,
  endInformation: PropTypes.instanceOf(Map).isRequired,
  endExchangePhase: PropTypes.func.isRequired,
  endInfoPhase: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,
  useSkill: PropTypes.func.isRequired,
  resetGame: PropTypes.func.isRequired,
  hidePlayerInformations: PropTypes.func.isRequired
}

export const mapDispatchToProps = (dispatch) => ({
  endExchangePhase: GameChannel.endExchangePhase,
  endInfoPhase: GameChannel.endInfoPhase,
  startGame: GameChannel.startGame,
  useSkill: GameChannel.useSkill,
  resetGame: () => dispatch(resetGameAction()),
  hidePlayerInformations: () => dispatch(hidePlayerInformationsAction())
})

const mapStateToProps = (state) => ({
  app: state.get('App'),
  game: state.get('Game'),
  player: state.get('Player'),
  roundInformation: state.get('RoundInformation'),
  playerInformation: state.get('PlayerInformation'),
  endInformation: state.get('EndInformation')
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)
