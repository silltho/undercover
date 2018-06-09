import React from 'react'
import PropTypes from 'prop-types'
import Flip from 'components/Animations/Flip'
import CardBack from 'components/CardBack'
import SunTimer from 'components/SunTimer'
import { Wrapper } from './Styles'

class GamePhaseWrapper extends React.PureComponent {
  render() {
    const {
      ready,
      phaseKey,
      children,
      timerDuration
    } = this.props

    return (
      <Flip>
        {ready ? <CardBack key={'roleCovert'} onRequestHide={() => {}} /> : <Wrapper key={phaseKey}>{children}</Wrapper>}
        {this.props.showTimer && <SunTimer timespan={timerDuration} key={`suntimer-${phaseKey}`} />}
      </Flip>
    )
  }
}

GamePhaseWrapper.defaultProps = {
  showTimer: false,
  timerDuration: undefined
}

GamePhaseWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  ready: PropTypes.bool.isRequired,
  phaseKey: PropTypes.string.isRequired,
  showTimer: PropTypes.bool,
  timerDuration: PropTypes.number
}

export default GamePhaseWrapper
