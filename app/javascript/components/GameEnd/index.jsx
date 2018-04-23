import React from 'react'
import PropTypes from 'prop-types'
import {
  BorderContainer,
  Content,
  BorderContainerFooter,
  BorderContainerTitel,
  Action
} from 'styles/components'
import { Winner } from './Styles'

class GameEnd extends React.PureComponent {
  render() {
    const {
      resetGame,
      winner
    } = this.props

    return (
      <Content>
        <BorderContainer>
          <BorderContainerTitel>
            Game Ended
          </BorderContainerTitel>
          <Content>
            <Winner>{winner}</Winner>
          </Content>
          <BorderContainerFooter>
            <Action onClick={resetGame}>back to the dashboard</Action>
          </BorderContainerFooter>
        </BorderContainer>
      </Content>
    )
  }
}

GameEnd.defaultProps = {
}

GameEnd.propTypes = {
  winner: PropTypes.string,
  resetGame: PropTypes.func.isRequired
}

export default GameEnd
