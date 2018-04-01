import React from 'react'
import PropTypes from 'prop-types'
import {
  BorderContainerAction,
  Content
} from 'styles/components'


import {
  Container
} from './Styles'

class RoleCovert extends React.PureComponent {
  render() {
    const {
      onRequestHide
    } = this.props

    return (
      <Content>
        <Container>
          <BorderContainerAction onClick={onRequestHide}>show</BorderContainerAction>
        </Container>
      </Content>
    )
  }
}

RoleCovert.defaultProps = {
}

RoleCovert.propTypes = {
  onRequestHide: PropTypes.func.isRequired
}

export default RoleCovert
