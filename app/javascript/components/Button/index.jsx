import React from 'react'
import PropTypes from 'prop-types'
import { ButtonWrapper } from './Styles'

class Button extends React.PureComponent {
  render() {
    const {
      text,
      onClick,
      className,
      children
    } = this.props
    return (
      <ButtonWrapper onClick={onClick} className={className}>
        {text || children}
      </ButtonWrapper>
    )
  }
}

Button.defaultProps = {
  className: ''
}

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string,
  children: PropTypes.node
}

export default Button
