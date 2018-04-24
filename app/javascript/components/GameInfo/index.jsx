import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import Flip from 'components/Animations/Flip'
import IconFont, { ICONS } from 'components/IconFont'
import {
  BorderContainer,
  Content,
  CornerButton,
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
      selectedDay: (this.props.roundInformation.size - 1).toString()
    }
  }

  componentDidMount() {
    if (this.buttonContainer) {
      this.buttonContainer.scrollLeft = this.buttonContainer.scrollWidth
    }
  }

  setButtonContainerRef = (container) => {
    this.buttonContainer = container
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
      roundInformation
    } = this.props

    const day = (parseInt(this.state.selectedDay, 10) + 1)
    const infos = roundInformation.get(this.state.selectedDay, [])
    const renderedInfos = infos.map(this.renderInfo)
    const renderedDayButtons = roundInformation.keySeq().map(this.renderDayButton)

    return (
      <Wrapper key={`round-information-${day}`}>
        <Content>
          <BorderContainer>
            <BorderContainerTitel>
              Dawn {day}
            </BorderContainerTitel>
            {renderedInfos.size > 0 ? (
              <Scrollable>
                <InfoList>
                  {renderedInfos}
                </InfoList>
              </Scrollable>
            ) : (<NoInfosMessage>-- no infos for this day --</NoInfosMessage>)
            }
            <BottomDawnContainer>
              {renderedDayButtons.size > 0 ?
                (
                  <DayButtonContainer innerRef={this.setButtonContainerRef}>
                    {renderedDayButtons}
                  </DayButtonContainer>
                ) : null
              }
            </BottomDawnContainer>
          </BorderContainer>
          <CornerButton right bottom onClick={readInfos}>
            <IconFont icon={ICONS.arrow_right} />
          </CornerButton>
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
  round: 0
}

GameInfo.propTypes = {
  round: PropTypes.number,
  readInfos: PropTypes.func.isRequired,
  roundInformation: PropTypes.instanceOf(Map).isRequired
}

export default GameInfo
