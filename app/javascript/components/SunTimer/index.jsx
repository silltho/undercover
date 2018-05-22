import React from 'react'
import PropTypes from 'prop-types'
import CornerButton from 'components/CornerButton'
import {
  SunBody,
  SunBeam
} from './Styles'

class SunTimer extends React.PureComponent {
  renderSunBeams = () => {
    const sunBeams = []
    const rayAngle = 360 / this.props.rayCount

    for (let i = 0; i < this.props.rayCount; i += 1) {
      sunBeams.push(<SunBeam key={`sunbeam-${i}`} rotate={rayAngle * i} />)
    }

    return sunBeams
  }

  render() {
    return (
      <CornerButton topRight onClickAction={() => {}}>
        <SunBody>
          {this.renderSunBeams()}
        </SunBody>
      </CornerButton>
    )
  }
}

SunTimer.defaultProps = {
  rayCount: 8
}

SunTimer.propTypes = {
  rayCount: PropTypes.number
}

export default SunTimer
