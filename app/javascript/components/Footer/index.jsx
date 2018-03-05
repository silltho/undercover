import React from 'react'
import PropTypes from 'prop-types'
import {
  Wrapper
} from './Styles'

class Footer extends React.PureComponent {
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

Footer.defaultProps = {
  children: {}
}

Footer.propTypes = {
  children: PropTypes.node
}

export default Footer
