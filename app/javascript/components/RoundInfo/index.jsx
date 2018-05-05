import React from 'react'
import PropTypes from 'prop-types'
import { Map, List } from 'immutable'
import DistributionInfo from 'components/DistributionInfo'
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
  InfoList,
  BottomDawnContainer
} from './Styles'

class GameInfo extends React.PureComponent {
  renderInfo = (info, index) => (
    <li key={`info_${index}`}>{info}</li>
  )

  renderDayButton = (day) => {
    const isActive = this.props.currentDay.toString() === day.toString()
    return (
      <DayButton
        key={`day_${day}`}
        switchToDay={this.props.onSwitchToDay}
        day={day}
        active={isActive}
      />)
  }

  render() {
    const {
      roundInformation,
      currentDay,
      days
    } = this.props

    const renderedInfos = roundInformation.map(this.renderInfo).toArray()
    const renderedDayButtons = days.map(this.renderDayButton)
    const partyDistribution = roundInformation.get('party_distribution')

    return (
      <Wrapper key={`round-information-${currentDay}`}>
        <Content>
          <BorderContainer>
            <BorderContainerTitel>
              Dawn {currentDay}
            </BorderContainerTitel>
            <DistributionInfo distribution={partyDistribution} />
            <Scrollable>
              <InfoList>
                {renderedInfos}
              </InfoList>
            </Scrollable>
            <BottomDawnContainer>
              <DayButtonContainer>
                {renderedDayButtons}
              </DayButtonContainer>
            </BottomDawnContainer>
          </BorderContainer>
        </Content>
      </Wrapper>
    )
  }
}

GameInfo.defaultProps = {
}

GameInfo.propTypes = {
  days: PropTypes.instanceOf(List).isRequired,
  currentDay: PropTypes.number.isRequired,
  roundInformation: PropTypes.instanceOf(Map).isRequired,
  onSwitchToDay: PropTypes.func.isRequired
}

export default GameInfo
