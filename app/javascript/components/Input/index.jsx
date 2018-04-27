import React from 'react'
import PropTypes from 'prop-types'
import {
  Wrapper,
  Input,
  Label,
  Line
} from './Styles'

class InputComponent extends React.PureComponent {
  render() {
    const {
      name,
      placeholder,
      type,
      label,
      error,
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
        <Label htmlFor={`input_${name}`} error={error}>
          {error || label}
        </Label>
        <Line error={error} />
      </Wrapper>
    )
  }
}

InputComponent.defaultProps = {
  placeholder: '',
  type: 'text',
  label: '',
  error: ''
}

InputComponent.propTypes = {
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string
}

export default InputComponent
