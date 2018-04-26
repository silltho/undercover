import React from 'react'
import PropTypes from 'prop-types'
import IconFont, { ICONS } from 'components/IconFont'
import TownVideo from 'assets/videos/Town.mp4'
import TownPoster from 'assets/images/town.jpg'
import CornerButton from 'components/CornerButton'
import PlayerStates from 'config/playerStates'
import {
  BorderContainer,
  Content,
  BorderContainerTitel
} from 'styles/components'

import {
  TownContainer
} from './Styles'


class GameExchange extends React.PureComponent {
  render() {
    const {
      player,
      endExchange
    } = this.props

    const state = player.get('state')

    return (
      <React.Fragment>
        <Content>
          <BorderContainer>
            <BorderContainerTitel>Day</BorderContainerTitel>
            <TownContainer>
              <video autoPlay muted loop="loop" poster={TownPoster} controlsList="nodownload nofullscreen">
                <source src={TownVideo} type="video/mp4" />
                <span>Your browser does not support the video tag.</span>
              </video>
            </TownContainer>
          </BorderContainer>
          {state === PlayerStates.ALIVE &&
            <CornerButton right bottom onClickAction={endExchange}>
              <IconFont icon={ICONS.checkmark} />
            </CornerButton>
          }
        </Content>
      </React.Fragment>
    )
  }
}

GameExchange.propTypes = {
  player: PropTypes.instanceOf(Map).isRequired,
  endExchange: PropTypes.func.isRequired
}

export default GameExchange
