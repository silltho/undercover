import React from 'react'
import PropTypes from 'prop-types'
import {
  BorderContainer,
  Content,
  BottomRight,
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
          <BottomRight>
            <Action onClick={resetGame}>back to the dashboard</Action>
          </BottomRight>
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
