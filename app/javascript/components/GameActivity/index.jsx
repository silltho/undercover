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
      useSkill
    } = this.props

    return (
      <Wrapper>
        <RoleImage background={roleDetails.get('image')}>
          <RoleName>{roleDetails.get('name')}</RoleName>
        </RoleImage>
        <Footer>
          <Button onClick={useSkill} text={roleDetails.get('active')} />
        </Footer>
      </Wrapper>
    )
  }
}

GameActivity.propTypes = {
  roleDetails: PropTypes.instanceOf(Map).isRequired,
  useSkill: PropTypes.func.isRequired
}

export default GameActivity
