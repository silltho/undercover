import React from 'react'
import PropTypes from 'prop-types'
import { ButtonWrapper } from './Styles'

class Button extends React.PureComponent {
  render() {
    const {
      text,
      onClick
    } = this.props
    return (
      <ButtonWrapper onClick={onClick}>
        {text}
      </ButtonWrapper>
    )
  }
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
}

export default Button
