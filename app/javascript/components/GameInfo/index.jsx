import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import Flip from 'components/Animations/Flip'
import CornerButton from 'components/CornerButton'
import IconFont, { ICONS } from 'components/IconFont'
import DistributionInfo from 'components/DistributionInfo'
import PlayerStates from 'config/playerStates'
import {
  BorderContainer,
  Content,
  BorderContainerTitel,
  Scrollable
} from 'styles/components'
import DayButton from './DayButton'
import {
  DayButtonContainer,
  Wrapper,
  NoInfosMessage,
  InfoList,
  BottomDawnContainer
} from './Styles'

class GameInfo extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      selectedDay: (this.props.roundInformation.size).toString()
    }
  }

  switchToDay = (day) => {
    this.setState({ selectedDay: day })
  }

  renderInfo = (info, index) => (
    <li key={`info_${index}`}>{info}</li>
  )

  renderDayButton = (day) => {
    const isActive = this.state.selectedDay === day
    return (
      <DayButton
        key={`day_${day}`}
        switchToDay={this.switchToDay}
        day={day}
        active={isActive}
      />)
  }

  renderRoundInformation = () => {
    const {
      readInfos,
      roundInformation,
      game,
      player
    } = this.props

    const day = (parseInt(this.state.selectedDay, 10))
    const infos = roundInformation.get(this.state.selectedDay, [])
    const renderedInfos = infos.map(this.renderInfo)
    const renderedDayButtons = roundInformation.keySeq().map(this.renderDayButton)
    const distribution = game.get('party_distribution')
    const state = player.get('state')

    return (
      <Wrapper key={`round-information-${day}`}>
        <Content>
          <BorderContainer>
            <BorderContainerTitel>
              Dawn {day}
            </BorderContainerTitel>
            <DistributionInfo distribution={distribution} />
            {renderedInfos.size > 0 ? (
              <Scrollable>
                <InfoList>
                  {renderedInfos}
                </InfoList>
              </Scrollable>
            ) : (<NoInfosMessage>-- no infos for this day --</NoInfosMessage>)
            }
            <BottomDawnContainer>
              <DayButtonContainer>
                {renderedDayButtons}
              </DayButtonContainer>
            </BottomDawnContainer>
          </BorderContainer>
          {state === PlayerStates.ALIVE &&
          <CornerButton right bottom onClickAction={readInfos}>
            <IconFont icon={ICONS.checkmark} />
          </CornerButton>
          }
        </Content>
      </Wrapper>
    )
  }

  render() {
    return (
      <Flip>
        {this.renderRoundInformation()}
      </Flip>
    )
  }
}

GameInfo.defaultProps = {
}

GameInfo.propTypes = {
  game: PropTypes.instanceOf(Map).isRequired,
  player: PropTypes.instanceOf(Map).isRequired,
  readInfos: PropTypes.func.isRequired,
  roundInformation: PropTypes.instanceOf(Map).isRequired
}

export default GameInfo
