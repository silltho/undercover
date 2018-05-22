import React from 'react'
import PropTypes from 'prop-types'
import { Map, List } from 'immutable'
import DistributionInfo from 'components/DistributionInfo'
import { getActiveIconByRole } from 'config/roleIcons'
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
  BottomDawnContainer,
  ActiveIcon,
  Info
} from './Styles'

class RoundInfo extends React.PureComponent {
  renderInfo = (info, index) => {
    const role = info.get('role')
    const icon = role ? getActiveIconByRole(role) : null
    return (
      <Info key={`info_${index}`}>
        {icon && <ActiveIcon icon={icon} />}
        <span>{info.get('info_text')}</span>
      </Info>
    )
  }

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

    const renderedInfos = roundInformation.get('infos').map(this.renderInfo).toArray()
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

RoundInfo.defaultProps = {
}

RoundInfo.propTypes = {
  days: PropTypes.instanceOf(List).isRequired,
  currentDay: PropTypes.number.isRequired,
  roundInformation: PropTypes.instanceOf(Map).isRequired,
  onSwitchToDay: PropTypes.func.isRequired
}

export default RoundInfo
