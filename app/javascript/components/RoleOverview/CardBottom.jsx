import React from 'react'
import PropTypes from 'prop-types'
import { ACTIVE_ICONS } from 'components/IconFont/index'
import PlayerStates from 'config/playerStates'
import { Map } from 'immutable'
import {
  ActionIcon,
  CardBottomWrapper,
  CardBottomText,
  ActionText
} from './Styles'

class CardBottom extends React.PureComponent {
  render() {
    const {
      showTargetSelection,
      player
    } = this.props

    const roleDetails = player.get('role', Map())
    const activeIcon = ACTIVE_ICONS[roleDetails.get('active')]
    const state = player.get('state')
    switch (state) {
      case PlayerStates.ALIVE:
        return (
          <CardBottomWrapper onClick={showTargetSelection}>
            <ActionIcon icon={activeIcon} />
            <ActionText>Choose your victim</ActionText>
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
  showTargetSelection: PropTypes.func.isRequired
}

export default CardBottom
