import React from 'react'
import PropTypes from 'prop-types'
import { DayButtonWrapper } from './Styles'

class DayButton extends React.PureComponent {
  switchToDay = () => {
    this.props.switchToDay(this.props.day)
  }

  render() {
    const {
      active,
      day
    } = this.props

    return (
      <DayButtonWrapper active={active} onClick={this.switchToDay} text={day} />
    )
  }
}

DayButton.defaultProps = {
  active: false
}

DayButton.propTypes = {
  active: PropTypes.bool,
  day: PropTypes.string.isRequired,
  switchToDay: PropTypes.func.isRequired
}

export default DayButton
