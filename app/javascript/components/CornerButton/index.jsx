import React from 'react'
import PropTypes from 'prop-types'
import { Wrapper } from './Styles'

class CornerButton extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      clicked: false
    }
  }

  handleOnClick = (params) => {
    this.setState({ clicked: true })
    this.props.onClickAction(params)
  }

  render() {
    return (
      <Wrapper
        onClick={this.handleOnClick}
        clicked={this.state.clicked}
        {...this.props}
      />
    )
  }
}

CornerButton.defaultProps = {
}

CornerButton.propTypes = {
  onClickAction: PropTypes.func.isRequired
}

export default CornerButton
