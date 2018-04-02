import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import Footer from 'components/Footer'
import Button from 'components/Button'
import {
  BorderContainer,
  Content,
  BorderContainerAction,
  BorderContainerTitel
} from 'styles/components'

import DayButton from './DayButton'
import { DayButtonContainer } from './Styles'

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

  render() {
    const {
      round,
      readInfos,
      roundInformation
    } = this.props

    const infos = roundInformation.get(this.state.selectedDay, [])
    const renderedInfos = infos.map(this.renderInfo)
    const renderedDayButtons = roundInformation.keySeq().map(this.renderDayButton)

    return (
      <React.Fragment>
        <Content>
          <BorderContainer>
            <BorderContainerTitel>
              Tag {(parseInt(this.state.selectedDay, 10) + 1)}
            </BorderContainerTitel>
            <ul style={{ flex: 1 }}>
              {renderedInfos.size > 0 ? renderedInfos : (<li>--no infos--</li>)}
            </ul>
            <DayButtonContainer innerRef={this.setButtonContainerRef}>
              {renderedDayButtons}
            </DayButtonContainer>
            <BorderContainerAction onClick={readInfos}>read</BorderContainerAction>
          </BorderContainer>
        </Content>
      </React.Fragment>
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
