import React from 'react'
import PropTypes from 'prop-types'
import Header from 'components/Header'
import Content from 'components/Content'
import Footer from 'components/Footer'
import Button from 'components/Button'

class TargetSelection extends React.PureComponent {
  render() {
    const {
      roleDetails,
      onRequestHide,
      useSkill
    } = this.props

    return (
      <React.Fragment>
        <Header>
          Who do you want to {roleDetails.get('active')}
        </Header>
        <Content>
          <div onClick={useSkill}>player1</div>
          <div onClick={useSkill}>player2</div>
          <div onClick={useSkill}>player3</div>
          <div onClick={useSkill}>player4</div>
        </Content>
        <Footer>
          <Button onClick={onRequestHide} text="Back" />
        </Footer>
      </React.Fragment>
    )
  }
}

TargetSelection.defaultProps = {
}

TargetSelection.propTypes = {
	roleDetails: PropTypes.instanceOf(Map).isRequired,
	players: PropTypes.instanceOf(Map).isRequired,
  useSkill: PropTypes.func.isRequired,
	onRequestHide: PropTypes.func.isRequired
}

export default TargetSelection
