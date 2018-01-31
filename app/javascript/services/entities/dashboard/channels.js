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

function createGame(title) {
	channel.perform(CREATE_GAME_REQUEST, { title })
}

function joinGame(gameId) {
	channel.perform(JOIN_GAME_REQUEST, { id: gameId })
}

function leaveGame(gameId) {
	console.log('leave', gameId)
	channel.perform(LEAVE_GAME_REQUEST, { id: gameId })
}

export default {
  init,
  createGame,
  joinGame,
  leaveGame
}
