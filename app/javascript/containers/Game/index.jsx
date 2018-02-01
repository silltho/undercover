import React from 'react'
import { connect } from 'react-redux'
import GameStart from 'components/GameStart/index'
import GameInfo from 'components/GameInfo/index'
import GameExchange from 'components/GameExchange/index'
import GameActivity from 'components/GameActivity/index'

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
      gamestate: gamePhases.info
    })
  }

  readInfos = () => {
    this.setState({
      gamestate: gamePhases.exchange
    })
  }

  endExchange = () => {
    this.setState({
      gamestate: gamePhases.activity
    })
  }

  useActivity = () => {
    this.setState({
      gamestate: gamePhases.info
    })
  }

  renderGamestate = () => {
    switch (this.state.gamestate) {
      case gamePhases.start:
        return (
          <GameStart />
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
        {this.renderGamestate()}
      </div>
    )
  }
}

Game.propTypes = {
}

export const mapDispatchToProps = (dispatch) => ({
})

const mapStateToProps = (state) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)
