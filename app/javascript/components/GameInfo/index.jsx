import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import Flip from 'components/Animations/Flip'
import RoundInfo from 'components/RoundInfo'
import CornerButton from 'components/CornerButton'
import SunTimer from 'components/SunTimer'
import IconFont, { ICONS } from 'components/IconFont'
import PlayerStates from 'config/playerStates'

class GameInfo extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      selectedDay: (this.props.roundInformations.size + 1).toString()
    }
  }

  switchToDay = (day) => {
    this.setState({ selectedDay: day })
  }

  renderRoundInformation = () => {
    const {
      roundInformations
    } = this.props

    const days = roundInformations.keySeq().toList()
    const currentDay = (parseInt(this.state.selectedDay, 10))
    const info = roundInformations.get(this.state.selectedDay)


    return (
      <RoundInfo
        key={`round-information-${currentDay}`}
        currentDay={currentDay}
        days={days}
        roundInformation={info}
        onSwitchToDay={this.switchToDay}
      />
    )
  }

  render() {
    const state = this.props.player.get('state')

    return (
      <Flip>
        {this.renderRoundInformation()}
        <SunTimer />
        {state === PlayerStates.ALIVE &&
          <CornerButton bottomRight onClickAction={this.props.readInfos}>
            <IconFont icon={ICONS.checkmark} />
          </CornerButton>
        }
      </Flip>
    )
  }
}

GameInfo.defaultProps = {
}

GameInfo.propTypes = {
  player: PropTypes.instanceOf(Map).isRequired,
  readInfos: PropTypes.func.isRequired,
  roundInformations: PropTypes.instanceOf(Map).isRequired
}

export default GameInfo
