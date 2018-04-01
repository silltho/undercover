import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import {
  VictimItemWrapper
} from './Styles'

class VictimItem extends React.PureComponent {
  useSkill = () => {
    this.props.useSkill(this.props.victim.get('id'))
  }

  render() {
    const {
      victim,
      isTarget
    } = this.props

    return (
      <VictimItemWrapper
        role="button"
        onClick={this.useSkill}
        isTarget={isTarget}
        isDead={victim.get('state') === 'dead'}
      >
        {victim.get('codename')}
      </VictimItemWrapper>
    )
  }
}

VictimItem.defaultProps = {
  isTarget: false
}

VictimItem.propTypes = {
  victim: PropTypes.instanceOf(Map).isRequired,
  useSkill: PropTypes.func.isRequired,
  isTarget: PropTypes.bool
}

export default VictimItem
