import { createChannel } from 'services/cable'
import {
  CREATE_GAME_REQUEST,
  LEAVE_GAME_REQUEST,
  JOIN_GAME_REQUEST
} from '../constants'

let dispatch

const channel = createChannel('UserChannel', {
  received(data) {
    dispatch(data)
  }
})

function init(store) {
  dispatch = store.dispatch
}

function createGame() {
	channel.perform(CREATE_GAME_REQUEST)
}

function leaveGame(gameId) {
	channel.perform(LEAVE_GAME_REQUEST, { id: gameId })
}

function joinGame(gameCode) {
	channel.perform(JOIN_GAME_REQUEST, { gamecode: gameCode })
}

export default {
  init,
  createGame,
  leaveGame,
  joinGame
}
