import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import Header from 'components/Header'
import Content from 'components/Content'
import Footer from 'components/Footer'
import Button from 'components/Button'
import {
  RoleImage
} from './Styles'

class RoleOverview extends React.PureComponent {
  render() {
    const {
      roleDetails,
      showTargetSelection,
      skipPhase
    } = this.props

    return (
      <React.Fragment>
        <Header>
          {roleDetails.get('name')}
        </Header>
        <Content>
          <RoleImage background={roleDetails.get('image')} />
        </Content>
        <Footer>
          <Button onClick={skipPhase} text="Skip" />
          <Button onClick={showTargetSelection} text={roleDetails.get('active')} />
        </Footer>
      </React.Fragment>
    )
  }
}

RoleOverview.defaultProps = {
}

RoleOverview.propTypes = {
  roleDetails: PropTypes.instanceOf(Map).isRequired,
  showTargetSelection: PropTypes.func.isRequired,
  skipPhase: PropTypes.func.isRequired
}

export default RoleOverview
