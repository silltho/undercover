import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import Header from 'components/Header'
import Content from 'components/Content'
import Footer from 'components/Footer'
import Button from 'components/Button'
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
        <Header>
          Tag {round}
        </Header>
        <Content>
          <ul>
            {renderedInfos.length > 0 ? renderedInfos : (<li>--no infos--</li>)}
          </ul>
        </Content>
        <Footer>
          {renderedDayButtons.size > 0 && (
            <DayButtonContainer innerRef={this.setButtonContainerRef}>
              {renderedDayButtons}
            </DayButtonContainer>
          )}
          <Button onClick={readInfos} text="gelesen" />
        </Footer>
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
