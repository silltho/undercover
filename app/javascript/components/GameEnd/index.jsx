import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
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
      endInformation
    } = this.props

    console.log('endInformation', endInformation)

    return (
      <Content>
        <BorderContainer>
          <BorderContainerTitel>
            Game Ended
          </BorderContainerTitel>
          <Content>
            <Winner>test</Winner>
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
  endInformation: PropTypes.instanceOf(Map).isRequired,
  resetGame: PropTypes.func.isRequired
}

export default GameEnd
