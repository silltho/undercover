import React from 'react'
import PropTypes from 'prop-types'
import {
  Wrapper
} from './Styles'

class Content extends React.PureComponent {
  render() {
    const {
      children
    } = this.props

    return (
      <Wrapper>
        {children}
      </Wrapper>
    )
  }
}

Content.defaultProps = {
  children: {}
}

Content.propTypes = {
  children: PropTypes.node
}

export default Content
