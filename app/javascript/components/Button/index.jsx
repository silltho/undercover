import React from 'react'
import PropTypes from 'prop-types'
import { ButtonWrapper } from './Styles'

class Button extends React.PureComponent {
  render() {
    const {
      text,
      onClick,
      className,
      children,
      primary
    } = this.props
    return (
      <ButtonWrapper onClick={onClick} className={className} primary={primary}>
        {text || children}
      </ButtonWrapper>
    )
  }
}

Button.defaultProps = {
  className: '',
  primary: false
}

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string,
  children: PropTypes.node,
  primary: PropTypes.bool
}

export default Button
