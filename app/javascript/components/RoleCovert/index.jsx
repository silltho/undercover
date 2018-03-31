import React from 'react'
import PropTypes from 'prop-types'
import Content from 'components/Content'
import Footer from 'components/Footer'
import Button from 'components/Button'

import {
  Container
} from './Styles'

class RoleCovert extends React.PureComponent {
  render() {
    const {
      onRequestHide
    } = this.props

    return (
      <React.Fragment>
        <Content>
          <Container />
        </Content>
        <Footer>
          <Button onClick={onRequestHide}>
            show
          </Button>
        </Footer>
      </React.Fragment>
    )
  }
}

RoleCovert.defaultProps = {
}

RoleCovert.propTypes = {
  onRequestHide: PropTypes.func.isRequired
}

export default RoleCovert
