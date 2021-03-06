import React from 'react'
import PropTypes from 'prop-types'
import CornerButton from 'components/CornerButton'
import {
  SunBody,
  SunBeam
} from './Styles'

class SunTimer extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      rayStart: 0,
      animationStarted: false
    }
  }

  componentWillMount() {
    const interval = this.props.timespan / this.props.rayCount
    this.currentInterval = setInterval(this.handleInterval, interval)
    this.animationStart = setTimeout(() => {
      this.setState({
        animationStarted: true
      })
    }, 0)
  }

  componentWillUnmount() {
    this.clearCurrentInterval()
    clearTimeout(this.animationStart)
  }

  clearCurrentInterval = () => {
    if (this.currentInterval) {
      clearInterval(this.currentInterval)
    }
  }

  handleInterval = () => {
    if (this.state.rayStart === this.props.rayCount - 1) this.clearCurrentInterval()
    this.setState({
      rayStart: this.state.rayStart + 1
    })
  }

  renderSunBeams = () => {
    const sunBeams = []
    const rayAngle = 360 / this.props.rayCount
    const transitionLength = (this.props.timespan / this.props.rayCount) * 0.8

    // this.state.rayStart + 1 to remove the center top sunbeam last
    for (let i = this.state.rayStart + 1; i <= this.props.rayCount; i += 1) {
      const remove = this.state.animationStarted && i === this.state.rayStart + 1
      sunBeams.push(<SunBeam
        key={`sunbeam-${i}`}
        rotate={rayAngle * i}
        remove={remove}
        transitionLength={transitionLength}
      />)
    }

    return sunBeams
  }

  render() {
    const blinkDuration = this.props.timespan / this.props.rayCount
    const blink = this.state.rayStart >= this.props.rayCount - 3

    return (
      <CornerButton topRight>
        <SunBody
          blink={blink}
          blinkDuration={blinkDuration}
        >
          {this.renderSunBeams()}
        </SunBody>
      </CornerButton>
    )
  }
}

SunTimer.defaultProps = {
  rayCount: 10,
  timespan: 32000
}

SunTimer.propTypes = {
  rayCount: PropTypes.number,
  timespan: PropTypes.number
}

export default SunTimer
