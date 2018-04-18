import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Map } from 'immutable'
import { GameChannel } from 'services/channels'
import {
  resetGameAction,
  hidePlayerInformationsAction,
  waitForOpponentAction
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
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  flex: 1;
`

class Game extends React.PureComponent {
  renderCurrentPhase = () => {
    switch (this.props.game.get('aasm_state')) {
      case GamePhases.INITIALIZED:
        return (
          <Wrapper key="game-start">
            <GameStart
              game={this.props.game}
              player={this.props.player}
              startGame={this.props.startGame}
            />
          </Wrapper>
        )
      case GamePhases.INFO:
        return (
          <Wrapper key="game-info">
            <GameInfo
              round={this.props.game.get('round') || 0}
              roundInformation={this.props.roundInformation}
              readInfos={this.props.endInfoPhase}
            />
          </Wrapper>
        )
      case GamePhases.EXCHANGE:
        return (
          <Wrapper key="game-exchange">
            <GameExchange
              endExchange={this.props.endExchangePhase}
            />
          </Wrapper>
        )
      case GamePhases.ACTIVITY:
        return (
          <Wrapper key="game-activity">
            <GameActivity
              useSkill={this.props.useSkill}
              allSkillsUsed={this.props.allSkillsUsed}
              player={this.props.player}
              game={this.props.game}
            />
          </Wrapper>
        )
      case GamePhases.FINISHED:
        return (
          <Wrapper key="game-finished">
            <GameEnd
              resetGame={this.props.resetGame}
            />
          </Wrapper>
        )
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

    return (
      <FadeIn>
        <SlideInOut>
          {this.renderCurrentPhase()}
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
  endExchangePhase: PropTypes.func.isRequired,
  endInfoPhase: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,
  useSkill: PropTypes.func.isRequired,
  allSkillsUsed: PropTypes.func.isRequired,
  resetGame: PropTypes.func.isRequired,
  hidePlayerInformations: PropTypes.func.isRequired
}

export const mapDispatchToProps = (dispatch) => ({
  endExchangePhase: () => {
    GameChannel.endExchangePhase()
    dispatch(waitForOpponentAction())
  },
  endInfoPhase: () => {
    GameChannel.endInfoPhase()
    dispatch(waitForOpponentAction())
  },
  startGame: () => {
    GameChannel.startGame()
    dispatch(waitForOpponentAction())
  },
  useSkill: (targetId) => {
    GameChannel.useSkill(targetId)
    dispatch(waitForOpponentAction())
  },
  allSkillsUsed: () => {
    GameChannel.allSkillsUsed()
    dispatch(waitForOpponentAction())
  },
  resetGame: () => dispatch(resetGameAction()),
  hidePlayerInformations: () => dispatch(hidePlayerInformationsAction())
})

const mapStateToProps = (state) => ({
  app: state.get('App'),
  game: state.get('Game'),
  player: state.get('Player'),
  roundInformation: state.get('RoundInformation'),
  playerInformation: state.get('PlayerInformation')
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)
