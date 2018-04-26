import React from 'react'
import PropTypes from 'prop-types'
import CornerButton from 'components/CornerButton'
import IconFont, { ICONS } from 'components/IconFont'
import {
  BorderContainer,
  Content,
  BorderContainerTitel
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
        </BorderContainer>
        <CornerButton bottom right onClickAction={resetGame}>
          <IconFont icon={ICONS.exit} />
        </CornerButton>
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
