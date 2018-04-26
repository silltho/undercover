import {
  RESET_GAME,
  HIDE_PLAYER_INFORMATIONS
} from './constants'

export const resetGameAction = () => ({ type: RESET_GAME })

export const hidePlayerInformationsAction = () => ({ type: HIDE_PLAYER_INFORMATIONS })