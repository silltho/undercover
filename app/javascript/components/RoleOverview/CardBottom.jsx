import React from 'react'
import PropTypes from 'prop-types'
import { ACTIVE_ICONS } from 'components/IconFont/index'
import PlayerStates from 'config/playerStates'
import { Map } from 'immutable'
import {
  ActionIcon,
  CardBottomWrapper,
  CardBottomText
} from './Styles'

class CardBottom extends React.PureComponent {
  render() {
    const {
      showTargetSelection,
      currentTarget,
      player
    } = this.props

    const roleDetails = player.get('role', Map())
    const activeIcon = ACTIVE_ICONS[roleDetails.get('active')]
    const state = player.get('state')
    switch (state) {
      case PlayerStates.ALIVE:
        return (
          <CardBottomWrapper>
            <React.Fragment>
              <ActionIcon icon={activeIcon} onClick={showTargetSelection} />
              <span>{currentTarget.has('codename') ? currentTarget.get('codename') : 'no target selected'}</span>
            </React.Fragment>
          </CardBottomWrapper>
        )
      case PlayerStates.DEAD: return (
        <CardBottomWrapper>
          <CardBottomText>R.I.P. You are dead. GG WP</CardBottomText>
        </CardBottomWrapper>
      )
      case PlayerStates.IMPRISONED: return (
        <CardBottomWrapper>
          <CardBottomText>You are imprisoned. Find the BeagleBoy to help you.</CardBottomText>
        </CardBottomWrapper>
      )
      default: return null
    }
  }
}

CardBottom.defaultProps = {
  currentTarget: Map()
}

CardBottom.propTypes = {
  player: PropTypes.instanceOf(Map).isRequired,
  showTargetSelection: PropTypes.func.isRequired,
  currentTarget: PropTypes.instanceOf(Map)
}

export default CardBottom
