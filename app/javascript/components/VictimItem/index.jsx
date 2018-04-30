import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import { ACTIVE_ICONS } from 'components/IconFont'
import { getImageByFraction } from 'config/fractionImages'
import PlayerStates from 'config/playerStates'
import {
  VictimItemWrapper,
  FractionImage,
  VictimInfo,
  VictimStateIcon,
  VictimIcon,
  VictimRole
} from './Styles'

const getStateIcon = (state) => {
  switch (state) {
    case PlayerStates.DEAD: return ACTIVE_ICONS.poison
    case PlayerStates.IMPRISONED: return ACTIVE_ICONS.imprison
    default: return null
  }
}

class VictimItem extends React.PureComponent {
  useSkill = () => {
    if (this.props.victim.get('state') !== PlayerStates.DEAD) {
      this.props.useSkill(this.props.victim.get('id'))
    }
  }

  render() {
    const {
      victim,
      isTarget
    } = this.props

    const codename = victim.get('codename')
    const role = victim.get('role', 'unknown')
    const fraction = victim.get('party')
    const fractionImage = getImageByFraction(fraction)
    const stateIcon = getStateIcon(victim.get('state'))

    return (
      <VictimItemWrapper
        role="button"
        onClick={this.useSkill}
        isTarget={isTarget}
        isDead={victim.get('state') === PlayerStates.DEAD}
      >
        <VictimIcon>
          {fractionImage && <FractionImage src={fractionImage} />}
        </VictimIcon>
        <VictimInfo>
          <span>{codename}</span>
          <VictimRole>{role}</VictimRole>
        </VictimInfo>
        <VictimIcon>
          {stateIcon && <VictimStateIcon icon={stateIcon} />}
        </VictimIcon>
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
