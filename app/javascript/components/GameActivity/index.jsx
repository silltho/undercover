import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import Footer from 'components/Footer'
import Button from 'components/Button'
import {
  Wrapper,
  RoleImage,
  RoleName
} from './Styles'

class GameActivity extends React.PureComponent {

  render() {
    const {
      roleDetails,
      endGame
    } = this.props

    return (
      <Wrapper>
        <RoleImage background={roleDetails.get('image')}>
          <RoleName>{roleDetails.get('name')}</RoleName>
        </RoleImage>
        <Footer>
          <Button onClick={endGame} text="use skill" />
        </Footer>
      </Wrapper>
    )
  }
}

GameActivity.propTypes = {
  roleDetails: PropTypes.instanceOf(Map).isRequired,
  endGame: PropTypes.func.isRequired
}

export default GameActivity
