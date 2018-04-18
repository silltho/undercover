import {
  RESET_GAME,
  HIDE_PLAYER_INFORMATIONS,
  WAIT_FOR_OPPONENTS
} from './constants'

export const resetGameAction = () => ({ type: RESET_GAME })

export const hidePlayerInformationsAction = () => ({ type: HIDE_PLAYER_INFORMATIONS })

export const waitForOpponentAction = () => ({ type: WAIT_FOR_OPPONENTS })