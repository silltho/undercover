import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { List, Map } from 'immutable'
import GameStart from 'components/GameStart'
import GameInfo from 'components/GameInfo'
import GameExchange from 'components/GameExchange'
import GameActivity from 'components/GameActivity'

const gamePhases = {
  start: 'start',
  info: 'info',
  exchange: 'exchange',
  activity: 'activity'
}

class Game extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      currentPhase: gamePhases.start
    }
  }

  startGame = () => {
    this.setState({
      currentPhase: gamePhases.info
    })
  }

  readInfos = () => {
    this.setState({
      currentPhase: gamePhases.exchange
    })
  }

  endExchange = () => {
    this.setState({
      currentPhase: gamePhases.activity
    })
  }

  useActivity = () => {
    this.setState({
      currentPhase: gamePhases.info
    })
  }

  renderCurrentPhase = () => {
    switch (this.state.currentPhase) {
      case gamePhases.start:
        return (
          <GameStart
            currentPlayer={this.props.currentPlayer}
            players={this.props.players}
            roleDetails={this.props.roleDetails}
          />
        )
      case gamePhases.info:
        return (
          <GameInfo
            day={1}
            readInfos={this.readInfos}
          />
        )
      case gamePhases.exchange:
        return (
          <GameExchange
            endExchange={this.endExchange}
          />
        )
      case gamePhases.activity:
        return (
          <GameActivity
            useActivity={this.useActivity}
          />
        )
      default:
        return (<div>default</div>)
    }
  }

  render() {
    return (
      <div>
        {this.renderCurrentPhase()}
      </div>
    )
  }
}

Game.propTypes = {
  players: PropTypes.instanceOf(List).isRequired,
	roleDetails: PropTypes.instanceOf(Map).isRequired,
  currentPlayer: PropTypes.instanceOf(Map).isRequired
}

export const mapDispatchToProps = (dispatch) => ({
})

const mapStateToProps = (state) => ({
  players: state.getIn(['Game', 'players'], List()),
  currentPlayer: state.getIn(['Game', 'current_player'], Map()),
  roleDetails: state.getIn(['Game', 'role_details'], Map())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)
