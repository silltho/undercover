import React from 'react'
import {
  Wrapper,
  Logo
} from './Styles'
import LogoImg from 'assets/images/palm_tree.png'

class Header extends React.PureComponent {
  render() {
    return (
      <Wrapper>
        <span>Under</span>
        <Logo src={LogoImg} />
        <span>Cover</span>
      </Wrapper>
    )
  }
}

export default Header
