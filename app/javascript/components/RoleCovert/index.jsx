import React from 'react'
import PropTypes from 'prop-types'
import LogoImage from 'assets/images/logo_frame.png'
import {
  BorderContainer,
  BottomRight,
  Content,
  Action
} from 'styles/components'


import {
  CardBack
} from './Styles'

class RoleCovert extends React.PureComponent {
  render() {
    const {
      onRequestHide
    } = this.props

    return (
      <Content>
        <BorderContainer>
          <CardBack>
            <img src={LogoImage} alt="logo"/>
          </CardBack>
          <BottomRight>
            <Action onClick={onRequestHide}>
              show
            </Action>
          </BottomRight>
        </BorderContainer>
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
