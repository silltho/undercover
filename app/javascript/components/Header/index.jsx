import React from 'react'
import LogoImg from 'assets/images/palm_tree.png'
import {
  Wrapper,
  Logo
} from './Styles'

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
