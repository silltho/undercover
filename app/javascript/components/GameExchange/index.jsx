import React from 'react'
import PropTypes from 'prop-types'
import IconFont, { ICONS } from 'components/IconFont'
import TownVideo from 'assets/videos/Town.mp4'
import TownPoster from 'assets/images/town.jpg'
import CornerButton from 'components/CornerButton'
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
      endExchange
    } = this.props

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
          <CornerButton right bottom onClickAction={endExchange}>
            <IconFont icon={ICONS.checkmark} />
          </CornerButton>
        </Content>
      </React.Fragment>
    )
  }
}

GameExchange.propTypes = {
  endExchange: PropTypes.func.isRequired
}

export default GameExchange
