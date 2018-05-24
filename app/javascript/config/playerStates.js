import { ACTIVE_ICONS } from 'components/IconFont'

const playerStates = {
  ALIVE: 'alive',
  DEAD: 'dead',
  IMPRISONED: 'imprisoned'
}

export const getIconByPlayerState = (state) => {
  switch (state) {
    case playerStates.DEAD: return ACTIVE_ICONS.poison
    case playerStates.IMPRISONED: return ACTIVE_ICONS.imprison
    default: return null
  }
}

export default playerStates
