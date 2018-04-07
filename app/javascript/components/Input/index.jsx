import React from 'react'
import PropTypes from 'prop-types'
import {
  Wrapper,
  Input,
  Label
} from './Styles'

class InputComponent extends React.PureComponent {
  render() {
    const {
      className,
      name,
      placeholder,
      type,
      label,
      onKeyDown,
      onChange
    } = this.props
    return (
      <Wrapper>
        <Input
          id={`input_${name}`}
          type={type}
          required
          placeholder={placeholder}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
        <Label htmlFor={`input_${name}`}>
          {label}
        </Label>
      </Wrapper>
    )
  }
}

InputComponent.defaultProps = {
  className: '',
  placeholder: '',
  type: 'text',
  label: ''
}

InputComponent.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string
}

export default InputComponent
