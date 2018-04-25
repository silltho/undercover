import React from 'react'
import PropTypes from 'prop-types'
import Flip from 'components/Animations/Flip'
import CardBack from 'components/CardBack'
import { Wrapper } from './Styles'

class GamePhaseWrapper extends React.PureComponent {
  render() {
    const {
      ready,
      phaseKey,
      children
    } = this.props

    return (
      <Flip>
        {ready ? <CardBack key={'roleCovert'} onRequestHide={() => {}} /> : <Wrapper key={phaseKey}>{children}</Wrapper>}
      </Flip>
    )
  }
}

GamePhaseWrapper.defaultProps = {
}

GamePhaseWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  ready: PropTypes.bool.isRequired,
  phaseKey: PropTypes.string.isRequired
}

export default GamePhaseWrapper
