import React from 'react'
import LogoImg from 'assets/images/palm_tree.png'
import {
  Wrapper,
  Logo,
  Line,
  Title
} from './Styles'

class Header extends React.PureComponent {
  render() {
    return (
      <Wrapper>
        <Title>
          <span>Under</span>
          <Logo src={LogoImg} />
          <span>Cover</span>
        </Title>
        <Line />
      </Wrapper>
    )
  }
}

export default Header
