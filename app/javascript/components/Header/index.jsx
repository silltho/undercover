import React from 'react'
import PropTypes from 'prop-types'
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
        {this.props.children ||
          (
            <Title>
              <span>Under</span>
              <Logo src={LogoImg} />
              <span>Cover</span>
            </Title>
          )
        }
        <Line />
      </Wrapper>
    )
  }
}

Header.defaultProps = {
  children: null
}

Header.propTypes = {
  children: PropTypes.node
}
export default Header
