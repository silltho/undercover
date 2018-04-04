import React from 'react'
import PropTypes from 'prop-types'
import {
  BorderContainerFooter,
  Content,
  Action
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
          <BorderContainerFooter>
            <Action onClick={onRequestHide}>
              show
            </Action>
          </BorderContainerFooter>
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
