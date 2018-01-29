import React from 'react'
import {
  Wrapper,
	MenuButton
} from './Styles'

class Nav extends React.PureComponent {
  render() {
    return (
      <Wrapper>
        <span>Under</span>
        <MenuButton>menu</MenuButton>
        <span>Cover</span>
      </Wrapper>
    )
  }
}

export default Nav
