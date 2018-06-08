import React from 'react'
import LogoImage from 'assets/images/logo_frame.png'
import {
  BorderContainer,
  Content
} from 'styles/components'


import {
  CardBackText,
  ImageWrapper,
  Wrapper
} from './Styles'

class CardBack extends React.PureComponent {
  render() {
    return (
      <Wrapper>
        <Content>
          <BorderContainer>
            <ImageWrapper>
              <img src={LogoImage} alt="logo" />
              <CardBackText>WAITING</CardBackText>
            </ImageWrapper>
          </BorderContainer>
        </Content>
      </Wrapper>
    )
  }
}

CardBack.defaultProps = {}

CardBack.propTypes = {}

export default CardBack
