import React from 'react'
import LogoImage from 'assets/images/logo_frame.png'
import {
  BorderContainer,
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
        <BorderContainer>
          <ImageWrapper>
            <img src={LogoImage} alt="logo" />
            <CardBackText>READY</CardBackText>
          </ImageWrapper>
        </BorderContainer>
      </Wrapper>
    )
  }
}

CardBack.defaultProps = {
}

CardBack.propTypes = {
}

export default CardBack
