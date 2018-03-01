import { createChannel } from 'services/cable'
import {
	CREATE_GAME_REQUEST,
  LEAVE_GAME_REQUEST,
  JOIN_GAME_REQUEST
} from './constants'

let dispatch

const channel = createChannel('DashboardChannel', {
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

function joinGame(gamecode) {
	channel.perform(JOIN_GAME_REQUEST, { code: gamecode })
}

function leaveGame(gameId) {
	channel.perform(LEAVE_GAME_REQUEST, { id: gameId })
}

export default {
  init,
  createGame,
  joinGame,
  leaveGame
}
