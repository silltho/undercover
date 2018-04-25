import React from 'react'
import LogoImage from 'assets/images/logo_frame.png'
import {
  BorderContainer,
  Content
} from 'styles/components'


import {
  CardBack,
  CardBackText
} from './Styles'

class RoleCovert extends React.PureComponent {
  render() {
    return (
      <Content>
        <BorderContainer>
          <CardBack>
            <img src={LogoImage} alt="logo" />
            <CardBackText>READY</CardBackText>
          </CardBack>
        </BorderContainer>
      </Content>
    )
  }
}

RoleCovert.defaultProps = {
}

export default RoleCovert
