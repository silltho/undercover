import React from 'react'
import PropTypes from 'prop-types'
import {
  Wrapper,
  TitleLine,
  TitleText
} from './Styles'

class Footer extends React.PureComponent {
  render() {
    const {
      title
    } = this.props

    return (
      <Wrapper>
        <TitleLine />
        <TitleText>
          {title}
        </TitleText>
        <TitleLine right />
      </Wrapper>
    )
  }
}

Footer.propTypes = {
  title: PropTypes.node.isRequired
}

export default Footer
