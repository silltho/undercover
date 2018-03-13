import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import Header from 'components/Header'
import Content from 'components/Content'
import Footer from 'components/Footer'
import Button from 'components/Button'

class GameInfo extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      selectedDay: this.props.roundInformation.size - 1
    }
  }

  switchToDay = (day) => {
    this.setState({ selectedDay: day })
  }

  render() {
    const {
      round,
      readInfos,
      roundInformation
    } = this.props

    const infos = roundInformation.get(this.state.selectedDay.toString(), [])
    const renderedInfos = infos.map((info, index) => (<li key={`info_${index}`}>{info}</li>))

    const renderedDayButtons = roundInformation.keySeq().map((key) => {
      if (roundInformation.get(key).size > 0) return (<Button key={`day_${key}`} onClick={() => this.switchToDay(key)} text={key} />)
      return null
    })

    return (
      <React.Fragment>
        <Header>
          Tag {round}
        </Header>
        <Content>
          <ul>
            {renderedInfos}
          </ul>
        </Content>
        <Footer>
          {renderedDayButtons}
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
