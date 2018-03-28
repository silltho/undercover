import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Map } from 'immutable'
import { GameChannel } from 'services/channels'
import GamePhases from 'config/gamePhases'
import SlideInOut from 'components/Animations/SlideInOut'
import GameStart from 'components/GameStart'
import GameInfo from 'components/GameInfo'
import GameExchange from 'components/GameExchange'
import GameActivity from 'components/GameActivity'
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
      default:
        return (<div>game is in a unknown state</div>)
    }
  }

  render() {
    return (
      <SlideInOut>
        {this.renderCurrentPhase()}
      </SlideInOut>
    )
  }
}

Game.propTypes = {
  game: PropTypes.instanceOf(Map).isRequired,
  player: PropTypes.instanceOf(Map).isRequired,
  roundInformation: PropTypes.instanceOf(Map).isRequired,
  endExchangePhase: PropTypes.func.isRequired,
  endInfoPhase: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,
  useSkill: PropTypes.func.isRequired,
  allSkillsUsed: PropTypes.func.isRequired
}

export const mapDispatchToProps = () => ({
  endExchangePhase: GameChannel.endExchangePhase,
  endInfoPhase: GameChannel.endInfoPhase,
  startGame: GameChannel.startGame,
  useSkill: GameChannel.useSkill,
  allSkillsUsed: GameChannel.allSkillsUsed
})

const mapStateToProps = (state) => ({
  game: state.get('Game'),
  player: state.get('Player'),
  roundInformation: state.get('RoundInformation')
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)
